import accFilterAdmin from "../../../controllers/admin/acc/accommodationFilter.js";

const accFilterHandler = async (req, res) => {
    const body = req.body
    try {
        const accFiltered = await accFilterAdmin(body)
        if (accFiltered.error) return res.status(404).send(accFiltered.error)
        return res.status(200).send(accFiltered.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};
export default accFilterHandler