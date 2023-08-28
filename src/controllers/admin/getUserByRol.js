import { prisma } from "../../db.js"

const getUserByRol = async (rol) => {

    if (!rol || typeof rol !== 'string') return { error: `El rol del usuario no esta bien especificado, ejemplo: {rol:"Anfitrion"}` }

    const rolFound = await prisma.userRol.findFirst({
        where: {
            rol: {
                equals: rol,
                mode: "insensitive"
            }
        }
    });
    if (!rolFound) {
        let AllRol = await prisma.userRol.findMany()
        AllRol = AllRol.map(elem => elem.rol)
        return { error: `No existe el rol "${rol}", solo existen ${AllRol}` }
    }

    const findAllAcc = await prisma.user.findMany({
        where: {
            userRol: {
                equals: rol,
                mode: "insensitive"
            }
        }
    });

    if (!findAllAcc.length) {
        return { error: `No se encontraron Usuarios` };
    }

    return { msg: findAllAcc }

}

export default getUserByRol