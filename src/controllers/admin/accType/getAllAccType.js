import { prisma } from "../../../db.js"

const getAllAccType = async () => {

    const existingAccType = await prisma.types.findMany();

    if (!existingAccType.length) {
        return { error: `No hay Accommodation types en la base de datos` };
    }
    const formatted = existingAccType.map(elem => elem.name)

    return { msg: formatted }
}

export default getAllAccType