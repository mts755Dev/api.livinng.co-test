import { prisma } from "../../../db.js"

const getAllHost = async () => {

    const host = await prisma.host.findMany()

    if (!host.length) return { error: 'La base de datos de Clientes esta vacia' }

    const allHost = host.map(elem => {
        return{
            id:elem.id,
            name:elem.name,
            email:elem.email,
            dni:elem.dni,
            phone:elem.phone,
            disabled:elem.disabled,

        }
    })

    return { msg: allHost }
}

export default getAllHost;