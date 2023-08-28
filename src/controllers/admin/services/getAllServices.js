import { prisma } from "../../../db.js"

const getAllServices = async () => {
  const allServices = await prisma.services.findMany();

  if(!allServices) {
    return {error: "No hay Servicios en la base de datos"};
  }

  const all = allServices.map(elem => elem.name)
  return {msg: all}
}

export default getAllServices;