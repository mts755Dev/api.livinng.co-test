import { prisma } from "../../../db.js";

const createReviewAcc = async (info, usuario) => {
  const { comentario, hospedaje, rating } = info;

  const clientFound = await prisma.client.findFirst({
    where: {
      email: usuario
    }
  })
  const client = clientFound.id

  if (!client || !comentario || !hospedaje || !rating) return { error: "Faltan datos" };
  if (rating < 1 || rating > 5) return { error: `el rating solo puede ser de 1 a 5` }

  const userIdVerification = await prisma.client.findUnique({
    where: {
      id: client,
    },
  });
  const accIdVerification = await prisma.accommodation.findUnique({
    where: {
      id: hospedaje,
    },
  });

  if (!userIdVerification) return { error: `el id ${client} de cliente no existe` };
  if (!accIdVerification) return { error: `el hospedaje con id ${hospedaje} no existe` };

  await prisma.review.create({
    data: {
      comment: info.comentario,
      clientId: client,
      accommodationId: hospedaje,
      Rating: rating
    },
  });
  return { msg: `Tu review fue creada correctamente` };
};

export default createReviewAcc;
