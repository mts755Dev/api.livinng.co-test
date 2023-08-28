import { prisma } from "../../../db.js"

const clientsFilter = async (data) => {

  const { status, name } = data
  let clientsStatus = null
  if (status === true || status === false) {
    clientsStatus = status
  }
  if (name && typeof name !== 'string') return { error: "el name tiene que ser de tipo string" }

  const clients = await prisma.client.findMany({
    where: {
      disabled: clientsStatus,
      name: name,
    },
    orderBy: {
      name: 'asc',
    },
  });

  if (!clients.length) return { error: 'No se encontraron Clientes' }

  return { msg: clients }
}

export default clientsFilter;