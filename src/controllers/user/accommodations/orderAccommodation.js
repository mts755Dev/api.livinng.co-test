import { prisma } from '../../../db.js';
import formattedAcc from "../../../utils/accommodation/formattedAcc.js"

const orderAccommodation = async (order) => {

    const allAcc = await prisma.accommodation.findMany({
        where:{
            disabled:false,
        },
        include: {
          type: true,
          size: true,
          services: true,
          host: true,
          Review: true,
        },
      })
    const formatted = await formattedAcc("FILTRO",allAcc)

    if (order && order.review) {
        if (order.review === "DES") {
            const sortedAccommodations = formatted.sort((a, b) => b.review.length - a.review.length)
            const formattedOrder = await formattedAcc("MUCHOS",sortedAccommodations)
            return { msg: formattedOrder }
        }
        if (order.review === "ASC") {
            const sortedAccommodations = formatted.sort((a, b) => a.review.length - b.review.length)
            const formattedOrder = await formattedAcc("MUCHOS",sortedAccommodations)
            return { msg: formattedOrder }
        }
        return { error: "Review solo se puede ordenar ASC o DES, en caso de no querer ordenar por review no mandar propiedad review o contactar con back" }
    }

    if (order && order.price) {
        if (order.price === "DES") {
            const sortedAccommodations = formatted.sort((a, b) => b.price - a.price)
            const formattedOrder = await formattedAcc("MUCHOS",sortedAccommodations)
            return { msg: formattedOrder }
        }
        if (order.price === "ASC") {
            const sortedAccommodations = formatted.sort((a, b) => a.price - b.price)
            const formattedOrder = await formattedAcc("MUCHOS",sortedAccommodations)
            return { msg: formattedOrder }
        }
        return { error: "Price solo se puede ordenar ASC o DES, en caso de no querer ordenar por price no mandar propiedad price o contactar con back" }
    }

    if (order && order.rating) {
        if (order.rating === "DES") {
            const sortedAccommodations = formatted.sort((a, b) => b.rating - a.rating)
            const formattedOrder = await formattedAcc("MUCHOS",sortedAccommodations)
            return { msg: formattedOrder }
        }
        if (order.rating === "ASC") {
            const sortedAccommodations = formatted.sort((a, b) => a.rating - b.rating)
            const formattedOrder = await formattedAcc("MUCHOS",sortedAccommodations)
            return { msg: formattedOrder }
        }
        return { error: "Rating solo se puede ordenar ASC o DES, en caso de no querer ordenar por rating no mandar propiedad rating o contactar con back" }
    }

    return { error: `Ordenamiento disponible: price y rating (tambien por cantidad de review, pero no creo que sea muy util)` }
}

export default orderAccommodation