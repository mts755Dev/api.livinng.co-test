import deleteAccSize from "../../../controllers/admin/size/deleteAccSize.js";

export const deleteAccSizeHandler = async (req, res) => {
    const { id } = req.params
    try {
        const deleteSize = await deleteAccSize(id)
        if (deleteSize.error) return res.status(404).send(deleteSize.error)
        return res.status(200).send(deleteSize.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};