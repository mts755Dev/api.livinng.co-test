import deleteFavorites from "../../../controllers/client/favorties/deleteFavorites.js";

export const deleteFavoritesClientIdHandler = async (req, res) => {
  const {id} = req.params
try {
    const reservations =  await deleteFavorites(id);
    if(reservations.error) return res.status(404).send(reservations.error)
    return res.status(200).send(reservations.msg)
} catch (error) {
    return res.status(500).send(error.message)
}
}


