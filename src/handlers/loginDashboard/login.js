import { prisma } from "../../db.js";
import { comparePassword } from "../../utils/hashPassword/hashPassword.js";
import jwt from 'jsonwebtoken';
const { secretKeyHOST, secretKeyADMIN } = process.env;


export const loginDashboard = async (req, res) => {
   try {
    if (req.body) {
        const adminFound = await prisma.admin.findFirst({
            where: {
                email: req.body.email
            }
        })
        if (adminFound) {
            if (adminFound.password === req.body.password) {
                const token = jwt.sign({}, secretKeyADMIN);
                await prisma.authadmin.create({
                    data: {
                        token: token,
                    },
                })

                return res.status(200).send({ role: 'ADMIN', token: token, name: adminFound.name })
            }
            return res.status(400).send('Contraseña incorrecta')
        }
        const hostFound = await prisma.host.findFirst({
            where: {
                email: req.body.email
            }
        })
        if (hostFound) {
            const isMatch = await comparePassword(req.body.password, hostFound.password);
            if (isMatch) {
                const token = jwt.sign({}, secretKeyHOST);

                await prisma.auth.create({
                    data: {
                        token: token,
                    },
                })

                return res.status(200).json({ role: "ANFITRION", id: hostFound.id, token: token, name: hostFound.name })
            }
            return res.status(400).send('Contraseña incorrecta')
        }
        return res.status(400).send(`Usuario no registrado`)
    }
   } catch (error) {
    return res.status(406).send('Error Dashboard login: '+ error.message )
   }
};