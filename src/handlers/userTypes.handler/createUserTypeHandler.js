import createUserType from "../../controllers/userType/createUserType.js";

export const createUserTypeHandler = async (req, res) => {
    const body = req.body
    try {
        const createType = await createUserType(body)
        if (createType.error) return res.status(404).send(createType.error)
        return res.status(200).send(createType.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};