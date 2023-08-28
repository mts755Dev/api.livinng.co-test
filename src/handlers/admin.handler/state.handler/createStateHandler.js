import createState from "../../../controllers/admin/state/createState.js"

export const createStateHandler = async (req, res) => {
    const data = req.body
    try {
        if(req.body.id)throw new Error('El id debe ser auto incremental')
        const postState = await createState(data)
        if (postState.error) return res.status(404).send(postState.error)
        if (postState.msg) return res.status(200).send(postState.msg)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}