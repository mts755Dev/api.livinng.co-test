import { prisma } from "../../../db.js"

const getAllAccSize = async () => {

    const existingAccSize = await prisma.size.findMany();

    if (!existingAccSize.length) {
        return { error: `No hay ningun size en la base de datos` };
    }
    const formatted = existingAccSize.map(elem => elem.name)

    return { msg: formatted }
}

export default getAllAccSize