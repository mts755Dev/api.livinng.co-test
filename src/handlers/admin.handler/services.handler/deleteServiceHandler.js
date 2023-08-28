import deleteService from "../../../controllers/admin/services/deleteService.js";

export const deleteServiceHandler = async (req, res) => {
  const {id} = req.params;
  try {
    const deletedService = await deleteService(id);
    if (deletedService.error) return res.status(404).send(deletedService.error);
    return res.status(200).send(deletedService.msg);
  } catch (error) {
  res.status(400).send(error.message);
  }
};