import { prisma } from "../../../db.js";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const createService = async (body) => {
  const services = body.services
  if (!Array.isArray(services)) return { error: 'Formato no valido, ejemplo: {services:["Tv", "Wifi", "Gimnasio"]}' }
  if (!services.length) return { error: `services no puede no contener elementos, services: ${services}` }

  for (let i = 0; i < services.length; i++) {
    let aux = capitalizeFirstLetter(services[i])
    const existingservicesType = await prisma.services.findFirst({
      where: {
        name: aux,
      },
    });
    if (existingservicesType) {
      continue
    }
    await prisma.services.create({
      data: {
        name: aux
      }
    })
  }

  return { msg: `services ${services} Creados correctamente` }
}

export default createService;