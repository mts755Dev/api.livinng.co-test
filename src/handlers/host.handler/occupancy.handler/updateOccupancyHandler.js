import updateOccupancy from "../../../controllers/host/occupancy/updateOccupancy.js";

export const updateOccupancyHandler = async (req, res) =>{
  const data = req.body
  try {
    const update = await updateOccupancy(data);
    if(update.error) return res.status(404).send(update.error);
    if(update.msg) return res.status(200).send(update.msg)

  } catch (error) {
    return res.status(500).send(error.message)
  }
}
