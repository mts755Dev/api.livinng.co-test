import accommodationById from '../../../controllers/user/accommodations/getAccommodationById.js'

const getAccommodationById = async (req, res, next) => {
  const { id } = req.params;
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    try {
      const accommodationId = await accommodationById(id);
      if (accommodationId.error) return res.status(404).send(accommodationId.error)
      return res.status(201).send(accommodationId.msg)
      //res.send("Equipo: esta ruta trae los accommodations por id")
    } catch (error) {
      return res.status(400).send(error.message)
    }
  }
  next()
}
export default getAccommodationById