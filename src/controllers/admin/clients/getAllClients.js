import { prisma } from "../../../db.js"

const getAllClients = async () => {

    const clients = await prisma.client.findMany({
        orderBy: {
          name: 'asc', 
        },
      });

    if (!clients.length) return { error: 'La base de datos de Clientes esta vacia' }

    return { msg: clients }
}

export default getAllClients;