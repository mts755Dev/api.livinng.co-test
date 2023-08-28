import { prisma } from "../../../db.js"

const deleteReview = async (id) => {

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return { error:`El id ${id} no es de tipo UUID`}

    const reviewFound = await prisma.review.findFirst({
        where: {
            id
        }
    })
    if (!reviewFound) return { error:`No existe review con id ${id}`}
    await prisma.review.delete({
        where: {
            id
        }
    })

    return { msg: `Review con id ${id} eliminada definitivamente` }
}
export default deleteReview