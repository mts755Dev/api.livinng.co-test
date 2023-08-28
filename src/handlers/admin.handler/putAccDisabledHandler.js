import updateAccDisabled from "../../controllers/admin/updateAccDisabled.js";

export const putAccDisabledHandler = async (req, res) => {
    const body = req.body
    try {
        const putAccDisabled = await updateAccDisabled(body)
        if(putAccDisabled.error)return res.status(404).send(putAccDisabled.error)
        return res.status(200).send(putAccDisabled.msg)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
