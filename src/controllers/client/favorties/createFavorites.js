import { prisma } from "../../../db.js";

const createFav = async (info, email) => {
  const { accommodationId } = info;
  const clientFound = await prisma.client.findFirst({
    where: {
      email: email
    }
  })
  const clientId = clientFound.id

  if (!accommodationId || !clientId)
    return {
      error: "Faltan datos, debe ser { 'accomodationId':'accommodationId', 'userId':'userId' }",
    };

  const acc = await prisma.accommodation.findFirst({
    where: {
      id: accommodationId,
    },
  });

  if (!acc) return { error: `El Hospedaje ${accommodationId} no existe` };

  const usuario = await prisma.cliet.findFirst({
    where: {
      id: clientId,
    },
  });
  if (!usuario) return { error: `El usuario ${clientId} no existe` };


  const repitedFav = await prisma.favorites.findFirst({
    where:{
      clientd: clientId,
      accommodationId : accommodationId
    }
  })
  if(repitedFav) return { error : "Este favorito ya existe"}


   await prisma.favorites.create({
    data: {
      Accommodation: {
        connect: {
         id: accommodationId,
        },
      },
      Client: {
        connect: {
          id: clientId,
        },
      },
    },
  });

  return { msg: "Favortitos creado con exito " };
};
export default createFav;
