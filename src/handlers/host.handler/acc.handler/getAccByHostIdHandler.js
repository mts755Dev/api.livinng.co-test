import accommodationByHostId from "../../../controllers/host/accommodations/getAccommodationByHostId.js";

export const getAccByHostIdHandler = async (req, res, next) => {
  const { id } = req.params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return next()
    try {
      const accommodationByHost = await accommodationByHostId(id);
      if (accommodationByHost.error) return res.status(404).send(accommodationByHost.error)
      return res.status(200).send(accommodationByHost.msg)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  
}