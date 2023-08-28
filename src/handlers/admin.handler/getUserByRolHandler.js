import getUserByRol from '../../controllers/admin/getUserByRol.js';


export const getUserByRolHandler = async (req, res, next) => {
    if (!req.query.rol) return next()
    try {
        const allUser = await getUserByRol(req.query.rol);
        if (allUser.error)
            return res.status(404).send(allUser.error);
        return res.status(200).send(allUser.msg);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
