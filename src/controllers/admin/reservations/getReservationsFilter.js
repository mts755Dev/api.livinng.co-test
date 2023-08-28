import { prisma } from "../../../db.js"

const getReservationsAndFilter = async (data) => {

    const { accId, state, price, date } = data
    let validAccId = undefined
    if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(accId)) validAccId = accId

    let validPrice = []
    if (price && price === "asc" || price === "desc") {
        validPrice.push(price)
        if (!validPrice.length) return { error: `Price no se puede ordenar por "${price}", solo se puede acomodar por "asc" o "desc"` }
    }
    let validDate = []
    if (date && date === "asc" || date === "desc") {
        validDate.push(date)
        if (!validDate.length) return { error: `date no se puede ordenar por "${date}", solo se puede acomodar por "asc" o "desc"` }
    }

    if (state !== null && state !== undefined && state) {
        if (typeof state !== 'string') return { error: "state tiene que ser string" }
        const stateFound = await prisma.state.findFirst({
            where: {
                name: state
            }
        })
        if (!stateFound) {
            let statesDb = await prisma.state.findMany()
            statesDb = statesDb.map(elem => elem.name)
            return { error: `No existe el state ${state}, los que existen son: "${statesDb}" ` }
        }
        const reservationsFound = await prisma.reservations.findMany({
            where: {
                accommodationId: accId,
                stateId: state !== null && state || undefined
            },
            orderBy: validPrice[0] && ({
                price: validPrice[0]
            }) || ({
                dateTime: validDate[0] || "asc"
            }),
            include:{
                accommodation: true
            }
        });
        if (!reservationsFound.length) return { error: 'No se encontraron reservations' }
        const formatted = reservationsFound.map(elem => {
            return {
                id: elem.id,
            name: elem.name,
            email: elem.email,
            address:elem.accommodation.address,
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
            accommodation:elem.accommodation.name
            }
        })
        return { msg: formatted }
    }
    const reservationsFound = await prisma.reservations.findMany({
        where: {
            accommodationId: validAccId,
            stateId: state !== null && state || undefined
        },
        orderBy: validPrice[0] && ({
            price: validPrice[0]
        }) || ({
            dateTime: validDate[0] || "asc"
        }),
        include: {
            accommodation: true
        }
    });
    if (!reservationsFound.length) return { error: 'No se encontraron reservations' }
    const formatted = reservationsFound.map(elem => {
        return {
            id: elem.id,
        name: elem.name,
        email: elem.email,
        phone: elem.name,
        address:elem.accommodation.address,
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
        accommodation:elem.accommodation.name
        }
    })

    let statesDb = ["Pendiente", "Confirmado", "Contraofertado", "Aceptado", "Rechazado", "Cancelado"]
    let order = []
    for (let i = 0; i < statesDb.length; i++) {
        order[i] = formatted.filter(elem => elem.stateId === statesDb[i])
    }
    return { msg: order.flat() }

}
export default getReservationsAndFilter