import getAllAccSize from "../../../controllers/admin/size/getAllAccSize.js";

export const getAllAccSizeHandler = async (req, res) => {
    try {
        const getAllSize = await getAllAccSize()
        if (getAllSize.error) return res.status(404).send(getAllSize.error)
        return res.status(200).send(getAllSize.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};