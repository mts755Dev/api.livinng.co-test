import { encryptPassword } from "../../../utils/hashPassword/hashPassword.js"
import { prisma } from "../../../db.js"

const createHost = async (data) => {
    const { name, phone, email, password, dni } = data
    if (!name) return { error: 'Falta el nombre' }
    if (!email) return { error: 'Falta el email' }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) return { error: 'Ingrese un formato de email ejemplo@text.com' }
    if (!password) return { error: 'Falta la contraseña' }
    if (!dni) return { error: 'Falta el dni' }
    if (!phone) return { error: 'Falta el numero de celular' }
    const userFound = await prisma.host.findFirst({
        where: {
            email
        }
    });
    const userFound2 = await prisma.admin.findFirst({
        where: {
            email
        }
    });
    if (userFound || userFound2) return { error: 'El email ya esta registrado con otro usuario ' }

    const phoneFound = await prisma.host.findFirst({
        where: {
            phone: +phone
        }
    });
    if (phoneFound) return { error: 'El numero de celaluar ya esta registrado con otro usuario ' }
    const dniFound = await prisma.host.findFirst({
        where: {
            dni
        }
    });
    if (dniFound) return { error: 'El dni ya esta registrado con otro usuario ' }

    const hashPassword = await encryptPassword(password)
    await prisma.host.create({
        data: {
            email,
            name,
            phone: +phone,
            dni,
            password: hashPassword
        }
    })

    return { msg: 'Usuario creado exitosamente' }

}
export default createHost