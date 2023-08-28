import { prisma } from '../../../db.js';

const updateClientDisabled = async (body) => {
  const { disabled, id } = body;

  if (typeof disabled !== 'boolean' || !id) return { error: 'tiene que llegar tanto disabled (boolean) como un id (UUID)' };

  const existeUser = await prisma.client.findFirst({
    where: {
      id: id
    }
  });

  if (!existeUser) return { error: 'No hay client con ese id' };

  await prisma.client.update({
    where: {
      id: id
    },
    data: {
      disabled: disabled
    }
  });

  return { msg: 'Modificación exitosa' };
};

export default updateClientDisabled;
