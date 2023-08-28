import createHost from "../../../controllers/admin/host/createHost.js";

export const createHostHandler = async (req, res) => {
  try {
    const Host = await createHost(req.body);
    if (Host.error) return res.status(500).json(Host.error);
    return res.status(200).json(Host.msg);
  } catch (error) {
    res.status(500).json(error.message);
  }
};