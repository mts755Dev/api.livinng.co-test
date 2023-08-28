import { prisma } from "../../../db.js";
import { sendConfirmationEmail } from "../../../utils/email/email.js"
import { generateReservationEmail } from "../../../utils/email/html.email.js";

const createReservations = async ({ dates, people, offer, contact, accommodationId }, email) => {
  const [initialDate, finalDate] = dates;

  const client = await prisma.client.findFirst({
    where: {
      email: email
    }
  })
  const clientId = client.id
  if (!initialDate) return { error: 'Ingrese la fecha inicial para la reservacion' };
  if (!finalDate) return { error: 'Ingrese la fecha final para la reservacion' };
  if (!people.adults) return { error: 'Ingrese la cantidad de adultos para la reservacion' };
  if (!offer.nights || !offer.price || !offer.total) return { error: 'Faltan datos en la oferta ' }
  if (!contact.name || !contact.email || !contact.phone) return { error: 'Ingrese informacion del contacto ' }
  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(contact.email)) return { error: 'Ingrese un formato de email ejemplo@text.com' };
  if (!/^\d+$/.test(contact.phone) || contact.phone < 0) return { error: 'Formato del número telefónico inválido' };

  const stateFound = await prisma.state.findMany()
  if (!stateFound.length) return { error: 'No hay estados cargados' }

  // Combinar consultas utilizando prisma.$transaction. Esto evita hacer múltiples viajes al servidor de la base de datos.
  const [clientFound, accommodationFound] = await prisma.$transaction([
    prisma.client.findFirst({ where: { id: clientId } }),
    prisma.accommodation.findFirst({ where: { id: accommodationId }, include: { host: true } })
  ]);

  if (!clientFound) return { error: 'la Foreign key proporcionada del usuario no existe' }
  if (!accommodationFound) return { error: 'la Foreign key proporcionada del alojamiento no existe' }

  //Parseamos el valor de la propiedad y sumamos la cantidad de personas  del objeto people
  let totalPeople = 0
  for (let key in people) {
    if (people.hasOwnProperty(key)) {
      people[key] = parseInt(people[key]);
      totalPeople += people[key];
    }
  }
  //la propiedad guets es el aforo del alojamiento
  if (totalPeople > accommodationFound.guests) return { error: 'La cantidad de personas excedes el aforo del alojamiento' }

  for (let key in offer) {
    if (offer.hasOwnProperty(key)) {
      offer[key] = parseInt(offer[key]);
    }
  }
  contact.phone = parseInt(contact.phone);

  let totalPrice = accommodationFound.price * offer.nights
  let totalOffer = offer.total
  if (totalOffer < totalPrice) return { error: 'La oferta no supera el minimo' }

  //! hubicarlo despues de crear la reservations
  const parseFinalDate = (new Date(finalDate)).toJSON().slice(0, 19).concat('Z')
  const parseInitialDate = (new Date(initialDate)).toJSON().slice(0, 19).concat('Z')

  // Verificar si ya existe una reserva para el mismo alojamiento y las mismas fechas proporcionadas
  const existingReservation = await prisma.reservations.findFirst({
    where: {
      clientId: clientId,
      accommodationId: accommodationId,
      dates: {
        equals: [parseInitialDate, parseFinalDate]
      }
    }
  });

  // Si existe una reserva para el mismo alojamiento y las mismas fechas
  if (existingReservation) {
    // Verificar si el clientId de la reserva existente es igual al clientId proporcionado
    if (existingReservation.clientId === clientId) {
      return { error: 'Ya tienes una reserva en esa fecha para este alojamiento' };
    }
  }
  const hostid = accommodationFound.hostId
  const reservationData = {
    dates: [parseInitialDate, parseFinalDate],
    adults: people.adults,
    childs: people.childs || null,
    nights: offer.nights,
    price: offer.price,
    total: offer.total,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    clientId: clientId,
    accommodationId: accommodationId,
    hostId: hostid
  };
  const createReservation = await prisma.reservations.create({
    data: reservationData
  });

  // //* Función para enviar el correo y monitorear el cambio de estado
  // const sendConfirmationEmailAndMonitorState = async () => {
  //   const updatedReservation = await prisma.reservations.findFirst({
  //     where: {
  //       id: createReservation.id,
  //     },
  //   });
  //       //llamamos la  etiqueta html pasandole los datos de la reservasion y lo asignamos a emailBodyNewOffer
  //       const emailBodyNewOffer = generateReservationEmail(accommodationFound, clientFound, initialDate, finalDate, contact, offer );

  //   if (updatedReservation.stateId === 'Pendiente') {
  //     await sendConfirmationEmail(accommodationFound.host.email, "Oferta de Alojamiento", emailBodyNewOffer);
  //   } else {
  //     // Si el estado ya no es "Pendiente", detener el envío periódico de correos
  //     clearInterval(intervalId);
  //     return;
  //   }
  // };

  // // Enviar el primer correo inmediatamente
  // await sendConfirmationEmailAndMonitorState();

  // // Configurar la ejecución periódica de la función de envío de correo cada 8 horas
  // const intervalId = setInterval(sendConfirmationEmailAndMonitorState, 8 * 60 * 60 * 1000);

  return { msg: 'Reserva creada exitosamente' };
};

export default createReservations;
