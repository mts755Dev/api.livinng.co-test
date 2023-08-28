import { prisma } from "../../../db.js";
import createOccupancy from "../../../controllers/host/occupancy/createOccupancy.js";
import deleteOccupancy from "../../host/occupancy/deleteOccupancy.js";
import createLinkPayment from "../../epayco/createLinkPayment.js";
import { sendConfirmationEmail } from "../../../utils/email/email.js";
import { generateOfferAcceptedEmail, sendConfirmationEmailReminder } from "../../../utils/email/html.email.js";
const activeIntervals = {}; // Objeto para almacenar los intervalos activos y los estados anteriores
const updateReservations = async (data) => {
    const { reservationId, stateId, hostId, dates, offer } = data;

    if (!reservationId) return { error: 'Ingrese el id de la reservación' };
    const [initialDate, finalDate] = dates || [];

    // Verificamos si hay reserva con el id
    const [reservationFound, stateFound] = await prisma.$transaction([
        prisma.reservations.findFirst({ where: { id: reservationId }, include: { Host: true, Client: true, accommodation: true } }),
        prisma.state.findFirst({ where: { name: stateId } })
    ]);
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
    };

    if (!reservationFound) return { error: `La reserva con el id ${reservationId} no existe` };
    if (!stateFound) return { error: `El estado ${stateId} no existe` };

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
        // //*Notifica al cliente  que se acepto su oferta

        // const emailBodyOfferAccept = generateOfferAcceptedEmail(reservationFound,"client");
        // await sendConfirmationEmail(reservationFound.Host.email, "Oferta Aceptada", emailBodyOfferAccept);

        // //*llamamos la  etiqueta html pasandole los datos de la reservasion y lo asignamos a emailBodyHostReminder
        // const emailBodyHostReminder = sendConfirmationEmailReminder(reservationFound,"client");

        // // Función para enviar el correo solo si el stateId sigue siendo 'Aceptado'
        // // Verificar si ya hay un intervalo activo para esta reserva y limpiarlo antes de iniciar uno nuevo
        // if (activeIntervals[reservationId]) {
        //     clearInterval(activeIntervals[reservationId]);
        // }
        // const sendEmailIfAccepted = async () => {
        //     const updatedReservation = await prisma.reservations.findFirst({ where: { id: reservationId } });
        //     if (updatedReservation && updatedReservation.stateId === 'Aceptado') {
        //         await sendConfirmationEmail(reservationFound.Host.email, "Oferta Aceptada", emailBodyHostReminder);
        //     } else {
        //         clearInterval(activeIntervals[reservationId]); // Detener el intervalo si el stateId ha cambiado o es diferente de 'Aceptado'
        //     }
        // };
        // // Ejecutar la función sendEmailIfAccepted inmediatamente
        // await sendEmailIfAccepted();
        // // Iniciar un nuevo intervalo que se ejecutará cada 8 horas)
        // activeIntervals[reservationId] = setInterval(async () => {
        //     await sendEmailIfAccepted();
        // }, 8 * 60 * 60 * 1000); //se ejecutara cada 8 horas

        //Iniciar el conteo de 24  horas para setear el estado en cancelado y  eliminar la occupancy
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
                await deleteOccupancy(updatedReservation.occupancyId);
            }
        }, 24 * 60 * 60 * 1000); // 24 horas en milisegundos

        const checkReservationStatus = async (reservationId) => {
            const reservation = await prisma.reservations.findFirst({ where: { id: reservationId } });
            if (reservation.stateId === 'Rechazado' || reservation.stateId === 'Cancelado') {
                await deleteOccupancy(reservation.occupancyId)
                clearInterval(interval); // Detiene el bucle de verificación
            }
        };
        // Verificar cada 30 minutos (20 minutos = 20 * 60 * 1000 milisegundos)
        const interval = setInterval(async () => {
            await checkReservationStatus(reservationId);
        }, 30 * 60 * 1000);

        return { msg: 'Se cambio el estado a Aceptado' };
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
        return { msg: 'La reserva ha sido rechazada' }
    }
}
export default updateReservations;
