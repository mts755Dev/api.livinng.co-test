import getAllHost from "../../../controllers/admin/host/getAllHost.js";

export const getAllHostsHandler = async (req, res) => {
  try {
    const Hosts = await getAllHost();
    if (Hosts.error) return res.status(500).json(Hosts.error);
    return res.status(200).json(Hosts.msg);
  } catch (error) {
    res.status(500).json(error.message);
  }
};