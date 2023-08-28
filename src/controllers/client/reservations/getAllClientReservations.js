import { prisma } from "../../../db.js";

const getAllReservations = async (clientId) => {

  if (!clientId) return { error: "se necesita un clientId" }
  const reservations = await prisma.reservations.findMany({
    where: {
      clientId: clientId
    },
    include: {
      accommodation: true
    }
  });
  if (!reservations.length) return { error: 'no se encontraron reservations con ese id' }
  const formatted = reservations.map(elem => {
    return {
      id: elem.id,
      name: elem.name,
      address:elem.accommodation.address,
      location: elem.accommodation.location,
      email: elem.email,
      phone: elem.name,
      dates: elem.dates,
      childs: elem.childs,
      adults: elem.adults,
      price: elem.price,
      nights: elem.nights,
      total: elem.total,
      dateTime: elem.dateTime,
      stateId: elem.stateId,
      clientId: elem.clientId,
      accommodationId: elem.accommodationId,
      hostId: elem.hostId,
      occupancyId: elem.occupancyId,
      accommodation: elem.accommodation.name,
      image: elem.accommodation.image[0]
      }
  })
  return { msg: formatted }
}
export default getAllReservations
