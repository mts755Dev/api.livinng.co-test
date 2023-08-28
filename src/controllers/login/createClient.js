import { prisma } from "../../db.js"

const createClient = async (data) => {
    const { name, email } = data
    if (!name) return { error: 'Falta el nombre' }
    if (!email) return { error: 'Falta el email' }

    await prisma.client.create({
        data: {
            email,
            name,
        }
    })

    return { msg: 'Cliente creado exitosamente' }

}
export default createClient