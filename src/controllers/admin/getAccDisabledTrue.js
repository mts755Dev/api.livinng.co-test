import { prisma } from "../../db.js"
import formattedAcc from "../../utils/accommodation/formattedAcc.js";

const getAccDisabledTrue = async () => {

    const findAllAcc = await prisma.accommodation.findMany({
      where: {
        disabled: true,
      },
      include: {
          type: true,
          size: true,
          services: true,
          host: true,
          Review: true,
        },
      });

      if (!findAllAcc.length) {
        return { error: `No se encontraron Hospedajes` };
    }

    const formatted = await formattedAcc("MUCHOS",findAllAcc)

    return { msg: formatted }

}

export default getAccDisabledTrue
