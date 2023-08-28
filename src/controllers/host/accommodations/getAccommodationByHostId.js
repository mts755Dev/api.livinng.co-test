import { prisma } from '../../../db.js';
import formattedAcc from '../../../utils/accommodation/formattedAcc.js';

const accommodationByHostId = async (id) => {
    const hostFound = await prisma.host.findFirst({
        where: {
            id
        }
    })

    if (!hostFound) return { error: `No hay Host con id ${id}` }

    const accByHostId = await prisma.accommodation.findMany({
        where: {
            hostId: id,
            disabled: false
        },
        include: {
            type: true,
            size: true,
            services: true,
            host: true,
            Review: true,
        },
    })
    const accByHostIdDisabled = await prisma.accommodation.findMany({
        where: {
            hostId: id,
            disabled: true
        },
        include: {
            type: true,
            size: true,
            services: true,
            host: true,
            Review: true,
        },
    })

    if (!accByHostId.length && !accByHostIdDisabled.length) return { error: `No hay hospedaje ligados al Anfitrion con id ${id}` };
    const formatted = await formattedAcc("ACCBYHOST", [...accByHostId, ...accByHostIdDisabled])

    return { msg: formatted }
};
export default accommodationByHostId;