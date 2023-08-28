import { prisma } from '../../../db.js';
import formattedAcc from '../../../utils/accommodation/formattedAcc.js';

const accommodationByName = async (name) => {
const accByName = await prisma.accommodation.findMany({
  where : {
    disabled:false,
    OR: [
      {
          name: {
              contains: name,
              mode: 'insensitive',
          },
      },
      {
          location: {
              contains: name,
              mode: 'insensitive',
          },
      },
  ],

  },
   include: {
    type: true,
    size: true,
    services: true,
    host: true,
    Review:true
   },
})
if(!accByName.length) return {error: `No hay hospedaje llamado ${name}`};

  const formatted = await formattedAcc("MUCHOS",accByName)

  return {msg: formatted}
};
export default accommodationByName;
