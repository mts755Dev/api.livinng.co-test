import deleteAcc from "../../../controllers/admin/acc/deleteAcc.js";

export const deleteAccHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteAcc(id);
        if (response.error)
            return res.status(404).send(response.error);
        return res.status(200).send(response.msg);
    } catch (error) {
        res.status(400).send(error.message);
    }
}