import { prisma } from "../../../db.js"

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};


const createSizeType = async (body) => {
    const size = body.size
    if (!Array.isArray(size)) return { error: 'Formato no valido, ejemplo: {size:["Alojamiento completo", "Habitación con baño privado", "Habitación con baño compartido"]}' }
    if (!size.length) return { error: `size no puede no contener elementos, size: ${size}` }

    for (let i = 0; i < size.length; i++) {
        let aux = capitalizeFirstLetter(size[i])
        const existingSizeType = await prisma.size.findFirst({
            where: {
                name: aux,
            },
        });
        if (existingSizeType) {
            continue
        }
        await prisma.size.create({
            data: {
                name: aux
            }
        })
    }

    return { msg: `sizes ${size} Creados correctamente` }
}

export default createSizeType