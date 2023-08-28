import accommodationByName from "../../../controllers/user/accommodations/getAccommodationByName.js";

const getAccommodationByName = async (req, res) => {

  const { name } = req.query;

  try {
    const accommodationId = await accommodationByName(name);
    if (accommodationId.error){
      return res.status(404).send(accommodationId.error);
    }
    return res.status(200).json(accommodationId.msg);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export default getAccommodationByName
