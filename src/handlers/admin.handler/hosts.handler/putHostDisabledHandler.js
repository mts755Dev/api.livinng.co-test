import updateHostDisabled from "../../../controllers/admin/host/updateHostDisabled.js";

export const putUserDisabledHandler = async (req, res) => {
    const body = req.body
    try {
        const putHostDisabled = await updateHostDisabled(body)
        if(putHostDisabled.error)return res.status(404).send(putHostDisabled.error)
        return res.status(200).send(putHostDisabled.msg)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
