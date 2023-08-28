import getAllServices from "../../../controllers/admin/services/getAllServices.js";

export const getAllServiceHandler = async (req, res) => {
  try {
    const allServices = await getAllServices();
    if (allServices.error) return res.status(404).send(allServices.error)
    return res.status(200).send(allServices.msg);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
