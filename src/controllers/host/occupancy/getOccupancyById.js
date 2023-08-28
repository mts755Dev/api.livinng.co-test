import { prisma } from "../../../db.js";

const getOccupancyById = async (accommodationId) => {
    if (!accommodationId) return { error: 'Ingrese el Id del alojamiento' };

    const accommodationFound = await prisma.accommodation.findFirst({
        where: {
            id: accommodationId,
        },
        include: {
            Occupancy: true, // Incluye solo las ocupaciones relacionadas con el alojamiento
        },
    });
    if(!accommodationFound)return{error:'El alojamiento no existe '}

    // Extraer solo las ocupaciones del resultado de la consulta
    const occupancyData = accommodationFound?.Occupancy || null;
    return occupancyData;
};

export default getOccupancyById;