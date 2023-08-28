import createAccType from "../../../controllers/admin/accType/createAccType.js";

export const createAccTypeHandler = async (req, res) => {
    const body = req.body
    try {
        const createType = await createAccType(body)
        if (createType.error) return res.status(404).send(createType.error)
        return res.status(200).send(createType.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};