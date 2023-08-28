import { prisma } from "../../../db.js"

const getAllReviews = async () => {

    const allReviews = await prisma.review.findMany({
        orderBy: {
          dateTime: 'desc',
         }, include: {
         accommodation: true,
         client:true,
         }
      })
      allReviews
      const formatted = allReviews.map((elem) => {
        return {
        id: elem.id,
        comentario: elem.comment,
        rating: elem.Rating,
        dateTime: elem.dateTime,
        clientId: elem.clientId,
        client: elem.client.name,
        accommodationId: elem.accommodationId,
        accommodation: elem.accommodation.name,
        image: elem.accommodation.image
        }
      })
    if (!allReviews.length) return { error: 'No existen reviews en la base de datos' }

    return { msg: formatted }
}
export default getAllReviews
