import getAllUserType from "../../controllers/userType/getAllUserTypes.js";

export const getAllUserTypeHandler = async (req, res) => {
    try {
        const getAllType = await getAllUserType()
        if (getAllType.error) return res.status(404).send(getAllType.error)
        return res.status(200).send(getAllType.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};