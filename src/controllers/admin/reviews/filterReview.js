import { prisma } from "../../../db.js"

const filterReview = async (body) => {
    const { accommodationId, clientId, rating } = body

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(accommodationId))return { error:`El id ${accommodationId} de accommodation no es de tipo UUID`}
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(clientId))return { error:`El id ${clientId} de client no es de tipo UUID`}

    const accFount = await prisma.accommodation.findFirst({
        where: {
            accommodationId,
        }
    })
    if (!accFount) return { error: `el accommodation con id ${accommodationId} no existe` }

    const clientFount = await prisma.client.findFirst({
        where: {
            clientId,
        }
    })
    if (!clientFount) return { error: `el cliente con id ${clientId} no existe` }

    if (rating === null || rating && rating > 5 || rating < 0) return { error: `el rating tiene que ser un numero entre 0 y 5, aparte de que no puede llegar como null, en caso de no querer filtrar por rating mandar "" o no mandarlo directamente ` }

    const allReviews = await prisma.review.findMany({
        where: {
            accommodationId,
            clientId
        }
    })
    if (!allReviews.length) return { error: 'No existen reviews en la base de datos' }

    if (rating <= 5 || rating >= 0) {
        const reviewFilter = allReviews.filter(elem => elem.Rating >= rating && elem.Rating <= rating + 0.99)
        return { msg: reviewFilter }
    }

    return { msg: allReviews }
}
export default filterReview