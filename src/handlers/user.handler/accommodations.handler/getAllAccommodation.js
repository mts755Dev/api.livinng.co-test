import getAccommodations from "../../../controllers/user/accommodations/getAccommodations.js";

const getAccommodationsHandler = async (req, res, next) => {

  if (!req.query.name) {

    try {
      const allAccommodations = await getAccommodations();
      if (allAccommodations.error)
        return res.status(404).send(allAccommodations.error);
      return res.status(200).send(allAccommodations.msg);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  next();
};
export default getAccommodationsHandler
