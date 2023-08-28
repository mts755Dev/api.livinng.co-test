import { prisma } from "../../../db.js";


const createOccupancy = async (data) => {
  const { initialDate, finalDate, reservationId } = data;

  if (!initialDate) return { error: 'Ingrese una fecha inicial para la reserva 2023-07-08T10:30:00Z' };
  if (!finalDate) return { error: 'Ingrese una fecha final para la reserva 2023-07-08T10:30:00Z' };
  if (initialDate === finalDate) return { error: ' La fecha inicial es la misma de la fecha final ' };
  const reservationsFound = await prisma.reservations.findFirst({
    where: {
      id: reservationId
    }
  })
  if (!reservationsFound) return { error: 'no hay reservasiones con el id' }

  const occupancyFound = await prisma.occupancy.findFirst({
    where: {
      initialDate: {
        gte: initialDate
      },
      finalDate: {
        lte: finalDate
      }
    }
  });
  if (occupancyFound && (reservationsFound.occupancyId === occupancyFound.id)) {
    return { error: 'ya tienes una ocupacion en esa fecha' }
  }

  await prisma.occupancy.create({
    data: {
      initialDate: new Date(initialDate),
      finalDate: new Date(finalDate),
      Reservations: { connect: { id: reservationId } }, // Conectar con la reserva existente por su id
      accommodation: { connect: { id: reservationsFound.accommodationId } }, // Conectar con el alojamiento existente por su id
    },
  });

  return { msg: 'Reserva creada exitosamente' };
};

export default createOccupancy;
