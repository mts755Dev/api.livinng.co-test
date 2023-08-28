import { prisma } from "../../../db.js"

const deleteAcc = async (id) => {

    if (!id) return { error: "para eliminar un accommodation se requiere un id" }
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return { error: "el id del accommodation tiene que ser de tipo UUID" }

    const accFound = await prisma.accommodation.findFirst({
        where: {
            id
        }
    })

    if (!accFound) return { error: `no se encontro un accommodation con id ${id}` }

    await prisma.accommodation.update({
        where: {
          id,
        },
        data: {
          services: {
            set: [], 
          },
        },
      });

      await prisma.accommodation.update({
        where: {
          id,
        },
        data: {
          Occupancy: {
            set: [],
          },
        },
      });

    await prisma.review.deleteMany({
        where: {
            accommodationId: id,
        },
    });

    await prisma.reservations.deleteMany({
        where: {
            accommodationId: id,
        },
    });

    await prisma.favorites.deleteMany({
        where: {
            accommodationId: id,
        },
    });

    await prisma.accommodation.delete({
        where: {
            id,
        },
    });

    return { msg: `accommodation con id ${id}, eliminado definitivamente` }

}

export default deleteAcc;