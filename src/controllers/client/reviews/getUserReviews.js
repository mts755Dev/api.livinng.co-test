import { prisma } from "../../../db.js";

const getUserReviews = async (clientId) => {
const accFound = await prisma.review.findMany({
  where:{
    clientId: clientId
  }
})
 if(!accFound.length) return {error: `no hay reviews con id de cliente ${clientId}`}

 const formatted = accFound.map(elem => {
   return {
     id:elem.id,
     comentario:elem.comment,
     rating:elem.Rating,
     dateTime: elem.dateTime,
     cliente: elem.clientId,
     hospedaje: elem.accommodationId
   }
 })

  return {msg: formatted}
}
 export default getUserReviews
