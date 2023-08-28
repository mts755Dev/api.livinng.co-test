import createHost from "../../controllers/admin/host/createHost.js";

const registerDashboard = async (req, res) => {
    const body = req.body
    try {
        const registerHost = await createHost(body)
        if (registerHost.error) return res.status(404).send(registerHost.error)
        return res.status(200).send(registerHost.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};
export default registerDashboard