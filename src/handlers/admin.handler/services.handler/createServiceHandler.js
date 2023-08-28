import createService from "../../../controllers/admin/services/createService.js";

export const createServiceHandler = async (req, res) => {
  const body = req.body;
  try {
    //return res.status(201).send("llego hasta aca")
    const createdService = await createService(body);
    if (createdService.error) return res.status(404).send(createdService.error);
     res.status(200).json(createdService.msg);
  } catch (error) {
  res.status(400).send(error.message);
  }
};
