import { prisma } from "../../../db.js"

const deleteOccupancy = async (id) => {
  if (!id) return { error: 'Ingrese id' }
  const occupancyFound = await prisma.occupancy.findFirst({
    where: {
      id: id
    }
  })
  if (!occupancyFound) return { error: 'No se encontro una occupancy con el id' }
  await prisma.occupancy.delete({
    where: {
      id: id
    }
  })
  return { msg: 'Occupancy eliminada exitosamente' }
}
export default deleteOccupancy;
