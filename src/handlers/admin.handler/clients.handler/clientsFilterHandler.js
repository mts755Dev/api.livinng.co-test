import clientsFilter from "../../../controllers/admin/clients/clientsFilter.js";

export const clientsFilterHandler = async (req, res) => {
  try {
    const clients = await clientsFilter(req.body);
    if (clients.error) return res.status(500).json(clients.error);
    return res.status(200).json(clients.msg);
  } catch (error) {
    res.status(500).json(error.message);
  }
};