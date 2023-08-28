import { prisma } from "../../../db.js";
import createOccupancy from "../../../controllers/host/occupancy/createOccupancy.js";
import deleteOccupancy from "../occupancy/deleteOccupancy.js";
import createLinkPayment from "../../epayco/createLinkPayment.js";
import { sendConfirmationEmail } from "../../../utils/email/email.js";
import { generateContraofferEmail, generateOfferAcceptedEmail, sendConfirmationEmailReminder } from "../../../utils/email/html.email.js";

const activeIntervals = {}; // Objeto para almacenar los intervalos activos y los estados anteriores
const updateReservations = async (data) => {
    const { reservationId, stateId, dates, offer } = data;

    if (!reservationId) return { error: 'Ingrese el id de la reservación' };
    const [initialDate, finalDate] = dates || [];

    // Verificamos si hay reserva con el id
    const [reservationFound, stateFound] = await prisma.$transaction([
        prisma.reservations.findFirst({ where: { id: reservationId }, include: { accommodation: true, Client: true, Host: true } }),
        prisma.state.findFirst({ where: { name: stateId } })
    ]);
console.log("reservationFound",reservationFound)
    const datosParaElLink = {
        email: reservationFound.email,
        name: reservationFound.name,
        amount: Math.ceil(reservationFound.total),
        title: reservationFound.id,
        description: reservationFound.id,
        quantity: 1,
        id: 0,
        onePayment: true,
        currency: "COP",
        base: 0,
        typeSell: 1,
        tax: 0,
    }
    console.log("datosParaElLink", datosParaElLink)

    if (!reservationFound) return { error: `La reserva con el id ${reservationId} no existe` };
    if (!stateFound) return { error: `El estado ${stateId} no existe` };

    // Si el estado es Contraofertado
    if (stateId === 'Contraofertado') {
        const newData = {
            dates: dates && dates.map(date => new Date(date)),
            nights: offer && offer.nights || reservationFound.nights,
            price: offer && offer.price || reservationFound.price,
            total: offer && offer.total || reservationFound.total
        };
        if (stateId !== reservationFound.stateId) {
            newData.dateTime = new Date(); // Reiniciar el campo dateTime
            newData.stateId = stateId;
        }

        await prisma.reservations.update({
            where: {
                id: reservationId
            },
            data: newData
        });


        //llamamos la  etiqueta html pasandole los datos de la reservasion y lo asignamos a emailBodyCounteroffer
        //!const emailBodyCounteroffer = generateContraofferEmail(reservationFound);

        //*Notifica a los client cuando tienen una Contraoferta
        //!await sendConfirmationEmail(reservationFound.Client.email, "Tienes una Contraoferta", emailBodyCounteroffer);

        // Iniciar el conteo de 2 minutos
        setTimeout(async () => {
            const updatedReservation = await prisma.reservations.findFirst({ where: { id: reservationId } });
            if (updatedReservation && updatedReservation.stateId === 'Contraofertado') {
                await prisma.reservations.update({
                    where: {
                        id: reservationId
                    },
                    data: {
                        stateId: 'Cancelado',
                    },
                });
            }
        }, 24 * 60 * 60 * 1000); // 24 horas en milisegundos

        return { msg: 'El estado cambió a Contraoferta' };
    }

    // Si el estado es Aceptado
    if (stateId === 'Aceptado') {
        const newData = {};

        if (stateId !== reservationFound.stateId) {
            newData.dateTime = new Date(); // Reiniciar el campo dateTime
            newData.stateId = stateId;
        }
        const createLink = await createLinkPayment(datosParaElLink);
        console.log("link de pago generado", createLink);
        if(createLink.msg) {

        await prisma.reservations.update({
            where: {
                id: reservationId
            },
            data: newData
        });

            await createOccupancy({ initialDate: reservationFound.dates[0], finalDate: reservationFound.dates[1], reservationId })

          } else {
            return {error:"Hay un error con Epayco"}
          }

        // //*llamamos la  etiqueta html pasandole los datos de la reservasion y lo asignamos a emailBodyOfferAccept
        // const emailBodyOfferAccept = generateOfferAcceptedEmail(reservationFound, "host");
        // await sendConfirmationEmail(reservationFound.Host.email, "Oferta Aceptada", emailBodyOfferAccept);

        // //*llamamos la  etiqueta html pasandole los datos de la reservasion y lo asignamos a emailBodyHostReminder
        // const emailBodyHostReminder = sendConfirmationEmailReminder(reservationFound, "host");
        // // Notifica al cliente que se acepto la oferta de la reserva
        // // y cada 8 horas le enviara un correo solo si el estado no ha cambiado

        // if (activeIntervals[reservationId]) {// Verificar si ya hay un intervalo activo para esta reserva y limpiarlo antes de iniciar uno nuevo
        //     clearInterval(activeIntervals[reservationId]);
        // }
        // const sendEmailIfAccepted = async () => {
        //     const updatedReservation = await prisma.reservations.findFirst({ where: { id: reservationId } });
        //     if (updatedReservation && updatedReservation.stateId === 'Aceptado') {
        //         await sendConfirmationEmail(reservationFound.Client.email, "Oferta Aceptada", emailBodyHostReminder);
        //     } else {
        //         clearInterval(activeIntervals[reservationId]); // Detener el intervalo si el stateId ha cambiado o es diferente de 'Aceptado'
        //     }
        // };
        // // Ejecutar la función sendEmailIfAccepted inmediatamente
        // await sendEmailIfAccepted();
        // // Iniciar un nuevo intervalo que se ejecutará cada 8 horas
        // activeIntervals[reservationId] = setInterval(async () => {
        //     await sendEmailIfAccepted();
        // }, 8 * 60 * 60 * 1000); //se ejecutara cada 8 horas


        // Iniciar el conteo de 24 horas
        setTimeout(async () => {
            const updatedReservation = await prisma.reservations.findFirst({ where: { id: reservationId } });
            if (updatedReservation && updatedReservation.stateId === 'Aceptado') {
                await prisma.reservations.update({
                    where: {
                        id: reservationId
                    },
                    data: {
                        stateId: 'Cancelado',
                    },
                });
                await deleteOccupancy(updatedReservation.occupancyId)//Se elimina la occupancy
            }
        }, 24 * 60 * 60 * 1000); // 24 horas en milisegundos 24 * 60 * 60 * 1000


        const checkReservationStatus = async (reservationId) => {
            const reservation = await prisma.reservations.findFirst({ where: { id: reservationId } });
            if (reservation.stateId === 'Rechazado' || reservation.stateId === 'Cancelado') {
                await deleteOccupancy(reservation.occupancyId)
                clearInterval(interval); // Detiene el bucle de verificación
            }
        };
        // Verificar cada 30 minutos
        const interval = setInterval(async () => {
            await checkReservationStatus(reservationId);
        }, 30 * 60 * 1000);

        return { msg: 'El estado cambió a Aceptado' };
    }

    // Si el estado es Rechazado
    if (stateId === 'Rechazado') {
        const newData = {};

        if (stateId !== reservationFound.stateId) {
            newData.dateTime = new Date(); // Reiniciar el campo dateTime
            newData.stateId = stateId;
        }

        await prisma.reservations.update({
            where: {
                id: reservationId
            },
            data: newData
        });

        return { msg: 'La reserva ha sido rechazada' };
    }

    return { error: `Error el estado ${stateId} No existe` };
};

export default updateReservations;
