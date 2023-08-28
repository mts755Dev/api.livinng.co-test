import {prisma} from "../../../db.js"

const deleteService = async (name) => {

  const foundService = await prisma.services.findFirst({
    where : {
      name : name,
    },
  });
  if (!foundService) {
    return {error : `El Service ${name} no existe`};
  }
  await prisma.services.delete({
    where : {
      name : name,
    },
  })

  return { msg: `El Service ${name} fue eliminado correctamente`}
};

export default deleteService