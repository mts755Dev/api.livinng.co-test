import deleteAccType from "../../../controllers/admin/accType/deleteAccType.js";

export const deleteAccTypeHandler = async (req, res) => {
    const { id } = req.params
    try {
        const deleteType = await deleteAccType(id)
        if (deleteType.error) return res.status(404).send(deleteType.error)
        return res.status(200).send(deleteType.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};