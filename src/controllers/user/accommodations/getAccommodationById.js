import { prisma } from '../../../db.js';
import formattedAcc from '../../../utils/accommodation/formattedAcc.js';

const accommodationById = async (id) => {

    if (typeof id !== 'string') return { error: `El "id" tiene que ser de tipo UUID` }

    const accById = await prisma.accommodation.findFirst({
        where: {
            id,
            disabled: false,
        },
        include: {
            type: true,
            size: true,
            services: true,
            Review: true,
            host: true
        },
    })
    if (!accById) return { error: `No hay hospedaje con id ${id}` };
    const formatted = await formattedAcc("UNO", accById)

    return { msg: formatted }
};
export default accommodationById;
