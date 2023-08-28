import { prisma } from '../../../db.js';

const updateHostDisabled = async (body) => {
  const { disabled, id } = body;

  if (typeof disabled !== 'boolean' || !id) return { error: 'tiene que llegar tanto disabled (boolean) como un id (UUID)' };

  const existeUser = await prisma.host.findFirst({
    where: {
      id: id
    }
  });

  if (!existeUser) return { error: 'No hay host con ese id' };

  await prisma.host.update({
    where: {
      id: id
    },
    data: {
      disabled: disabled
    }
  });

  return { msg: 'Modificación exitosa' };
};

export default updateHostDisabled;
