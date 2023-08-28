import { prisma } from "../../../db.js";

const updateOccupancy = async (data) => {
  const { accommodationId, dates, reservationId } = data;
  if (!accommodationId) return { error: 'Ingrese el id del alojamiento' }

  const accommodationsFound = await prisma.accommodation.findFirst({
    where: {
      id: accommodationId
    }
  });
  if (!accommodationsFound) return { error: `No existe el alojamiento con el id ${accommodationId}` }
  // En caso de enviar un reservationId se modificara las fechas para esa solicitud de reservación
  if (accommodationId && dates && reservationId) {
    const [initialDate, finalDate] = dates || []
    const reservationFound = await prisma.reservations.findFirst({
      where: {
        id: reservationId
      }
    });
    if (!reservationFound) return { error: `No existe la reservasion con el id ${reservationId}` }
    //! if(reservationFound.stateId !== 'Pendiente') return{error:`No puedes modificar la occupancy de la reserva con estado ${reservationFound.stateId}`}
    const occId = reservationFound.occupancyId
    if (!occId) return { error: `La reservación no tiene occupancy relacionada` }

    //Con esto, la consulta buscará una ocupación cuya initialDate sea igual a initialDate y cuya finalDate sea igual a finalDate,
    //pero también asegurará que no haya ninguna ocupación que se encuentre entre initialDate y finalDate.
    const occupancyFound = await prisma.occupancy.findFirst({
      where: {
        id: { not: occId }, // Excluyendo la ocupación actual que se está actualizando de la búsqueda
        OR: [
          {
            initialDate: { lte: initialDate },
            finalDate: { gte: initialDate },
          },
          {
            initialDate: { lte: finalDate },
            finalDate: { gte: finalDate },
          },
          {
            initialDate: { gte: initialDate },
            finalDate: { lte: finalDate },
          },
        ],
      },
    });
    if (occupancyFound && occupancyFound.id !== occId) return { error: 'No puedes actualizar: ya hay occupancy en esas fechas ', occupancyFound }

    await prisma.occupancy.update({
      where: {
        id: occId
      },
      data: {
        initialDate,
        finalDate
      }

    });
    return { msg: 'Se actualizo la occupancy' }
  }

  const [initialDate, finalDate] = dates || []
  const occupancyFound = await prisma.occupancy.findFirst({
    where: {
      OR: [
        {
          initialDate: { lte: initialDate },
          finalDate: { gte: initialDate },
        },
        {
          initialDate: { lte: finalDate },
          finalDate: { gte: finalDate },
        },
        {
          initialDate: { gte: initialDate },
          finalDate: { lte: finalDate },
        },
      ],
    },
  });
  if (occupancyFound) return { error: 'Las fecha tienen occupancy' }
  await prisma.occupancy.create({
    data: {
      initialDate: initialDate, // La fecha de inicio de la nueva ocupación
      finalDate: finalDate, // La fecha de finalización de la nueva ocupación
      // Otros campos de la ocupación que necesites asignar al crearla
    },
  });
  return{msg:'Se creo la occupancy'}
}
export default updateOccupancy;
