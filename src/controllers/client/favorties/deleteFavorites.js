import { prisma } from '../../../db.js';

const deleteFavorites = async (id) => {
  if (!id) return { error: "Inglese favorites Id" }
  const favorites = await prisma.favorites.findFirst({
    where: {
      id: id
    }
  })
  if (!favorites) return { error: "no hay favoritos con ese id" }

  await prisma.favorites.delete({
    where: {
      id: id
    }
  })

  return { msg: "el favorito fue eliminado correctamente" }
}


export default deleteFavorites;
