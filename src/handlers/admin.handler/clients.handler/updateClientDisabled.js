import updateClientDisabled from "../../../controllers/admin/clients/updateUserDisabled.js";

export const putUserDisabledHandler = async (req, res) => {
    const body = req.body
    try {
        const putUserDisabled = await updateClientDisabled(body)
        if(putUserDisabled.error)return res.status(404).send(putUserDisabled.error)
        return res.status(200).send(putUserDisabled.msg)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
