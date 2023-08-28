
import { prisma } from "../../../db.js"


const getReservationsById = async (reservationId) => {

    if (!reservationId) return { error: 'debes introducir un id' }
    const getById = await prisma.reservations.findFirst({
        where: {
            id: reservationId
        },
        include: {
            accommodation: {
                select: {
                    name: true,
                    location: true,
                },
            },
            Host: {
                select: {
                    name: true,
                },
            }
        }
    })
    if (!getById) return { error: 'No se encontro la reserva con ese id' }
    const reservationDetail = {
        timeStamp: getById.dateTime,
        offer: {
            nights: getById.nights,
            price: getById.price,
            total: getById.total
        },
        dates: getById.dates,
        people: {
            childs: getById.childs,
            adults: getById.adults
        },
        status: getById.stateId,
        accommodation: {
            name: getById.accommodation.name,
            location: getById.accommodation.location,
        },
        hostid: {
            name: getById.Host.name,
        }
    };
    return reservationDetail
}
export default getReservationsById