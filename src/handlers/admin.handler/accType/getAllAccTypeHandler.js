import getAllAccType from "../../../controllers/admin/accType/getAllAccType.js";

export const getAllAccTypeHandler = async (req, res) => {
    try {
        const getAllType = await getAllAccType()
        if (getAllType.error) return res.status(404).send(getAllType.error)
        return res.status(200).send(getAllType.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};