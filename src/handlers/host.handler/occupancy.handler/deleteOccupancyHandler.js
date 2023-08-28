import deleteOccupancy from "../../../controllers/host/occupancy/deleteOccupancy.js"

export const deleteOccupancyHandler = async(req,res) => {
  const { id } = req.params
  try {
      const deleteOcc =  await deleteOccupancy(+id)
      if(deleteOcc.error)return res.status(400).send(deleteOcc.error)
      if(deleteOcc.msg)return res.status(200).send(deleteOcc.msg)
  } catch (error) {
      return res.status(500).send(error.message)
  }
}
