import { prisma } from '../../db.js';

const updateAccDisabled = async (body) => {
  const { disabled, id } = body

  if (typeof disabled !== 'boolean' || !id) return { error: "faltan datos" }

  const existeAcc = await prisma.accommodation.findFirst({
    where: {
      id: id
    }
  })
  if (!existeAcc) return { error: "no hay hospedaje con ese id" }

  await prisma.accommodation.update({
    where: {
      id: id
    },
    data: {
      disabled: Boolean(disabled)
    }
  });

  return { msg: "Modificaciones existosa" };


}

export default updateAccDisabled;
