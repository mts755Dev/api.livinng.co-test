import getAllClients from "../../../controllers/admin/clients/getAllClients.js";

export const getAllClientsHandler = async (req, res) => {
  try {
    const clients = await getAllClients();
    if (clients.error) return res.status(500).json(clients.error);
    return res.status(200).json(clients.msg);
  } catch (error) {
    res.status(500).json(error.message);
  }
};