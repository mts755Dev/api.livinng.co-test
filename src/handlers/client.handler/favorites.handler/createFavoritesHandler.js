import createFav from "../../../controllers/client/favorties/createFavorites.js";

export const createFavorites = async (req, res) => {
  const  info  = req.body
  try {
    const createF = await createFav(info, req.usuario.email);
    if (createF.error) return res.status(404).send(createF.error)
    return res.status(200).send(createF.msg)
  } catch (error) {
return res.status(500).send(error.message)
  }

};
