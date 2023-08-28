import { prisma } from "../../../db.js"

const deleteAccType = async (name) => {

    const existingAccType = await prisma.types.findFirst({
        where: {
            name: name,
        },
    });

    if (!existingAccType) {
        return { error: `tipo de hospedaje ${name} no existe` };
    }

    await prisma.types.delete({
        where:{
            name:name
        }
    })

    return { msg: `tipo de hospedaje ${name} eliminado correctamente` }
}

export default deleteAccType