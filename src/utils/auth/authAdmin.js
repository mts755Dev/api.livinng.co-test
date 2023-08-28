import { prisma } from "../../db.js";

export const MiddlewareAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];;
    if (!token) {
        console.log(req.headers)
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const tokenFound = await prisma.authadmin.findFirst({
            where: {
                token: token
            }
        })
        if (!tokenFound) return res.status(401).json({ mensaje: `El Token proporcionado no existe en la base de datos, Token: ${token}` })
        next();
    } catch (error) {
        console.error('Error al verificar el token', error);
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};
