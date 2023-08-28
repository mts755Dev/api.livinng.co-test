import { prisma } from "../../db.js";

export const logout = async (req, res) => {
    try {
        const { token } = req.query
        if (token) {
            const tokenFound = await prisma.auth.findFirst({
                where: {
                    token
                }
            })
            if (tokenFound) {
                await prisma.auth.delete({
                    where: {
                        id: tokenFound.id
                    }
                })
                return res.status(200).json({ message: "Logout exitoso, token eliminado" })
            }
            const tokenAdminFound = await prisma.authadmin.findFirst({
                where: {
                    token
                }
            })
            if (tokenAdminFound) {
                await prisma.authadmin.delete({
                    where: {
                        id: tokenAdminFound.id
                    }
                })
                return res.status(200).json({ message: "Logout exitoso, token eliminado" })
            }
            return res.status(404).json({ error: 'token no encontrado en la base de datos' })            
        }
        res.status(400).json({ error: 'Debe mandar un token por query' })
    } catch (error) {
        return res.status(400).send(error.message)
    }
};