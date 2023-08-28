import { prisma } from "../../../db.js"

const deleteAccSize = async (name) => {

    const existingAccSize = await prisma.size.findFirst({
        where: {
            name,
        },
    });

    if (!existingAccSize) {
        return { error: `Accommodation size con name ${name} no existe` };
    }
    await prisma.size.delete({
        where:{
            name
        }
    })

    return { msg: `Accommodation size con name ${name} eliminado correctamente` }
}

export default deleteAccSize