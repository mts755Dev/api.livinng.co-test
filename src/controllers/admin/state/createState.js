import { prisma } from "../../../db.js"

const createState = async (data) => {
    const { name } = data
    if (!name) return { error: 'Ingresa un estado' }
    //hago una busqueda para validar que el estado no exista antes de crearlo
    const stateFound = await prisma.state.findFirst({
        where: {
            name
        }
    })
    if (stateFound) return { error: 'El estado ya existe' }
    await prisma.state.create({
        data: data
    })
    return { msg: 'Estado creado exitosamente' }
}
export default createState