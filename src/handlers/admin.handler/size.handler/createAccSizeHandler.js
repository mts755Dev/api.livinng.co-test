import createAccSize from "../../../controllers/admin/size/createAccSize.js";

export const createAccSizeHandler = async (req, res) => {
    const body = req.body
    try {
        const createSize = await createAccSize(body)
        if (createSize.error) return res.status(404).send(createSize.error)
        return res.status(200).send(createSize.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};