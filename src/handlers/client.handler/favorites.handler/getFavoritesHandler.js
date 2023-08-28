import getAllFav from "../../../controllers/client/favorties/getFavoritesClientId.js";
import { prisma } from "../../../db.js";


export const getAllFavorites = async (req, res) => {
  
  try {
    const clientFound = await prisma.client.findFirst({
      where: {
        email: req.usuario.email
      }
    })
    const allFav = await getAllFav(clientFound.id);
    if (allFav.error) return res.status(404).send(allFav.error);
    return res.status(200).send(allFav.msg);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
