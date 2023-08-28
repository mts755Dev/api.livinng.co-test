import { prisma } from "../../../db.js";

const getReviews = async (info) => {
  const { hostId, accommodationId } = info;
  if (!hostId && !accommodationId) return { error: "es necesario un hostId o un accommodationId" }
  if (!accommodationId) {
    const hostFound = await prisma.host.findFirst({
      where: {
        id: hostId
      }
    })
    if (!hostFound) return { error: "no existe host con ese id" };
    const todosReviewsHostId = await prisma.accommodation.findMany({
      where: {
        hostId: hostId
      }
    });
    if (!todosReviewsHostId.length) return { error: "no hay hospedajes creados por ese host" };
    const allAcc = todosReviewsHostId.map(elem => elem.id)

    const hostReviewFound = await prisma.review.findMany({
      where: {
        accommodationId: {
          in: allAcc,
        },
      },
      include: {
        accommodation: true,
        client: true,
      },
      orderBy: {
        dateTime: "desc",
      },
    });
    if (!hostReviewFound.length) return { error: "no existen reviews en los acc de ese host" }
    const hostIdAccReviews = hostReviewFound.map((elem) => {
      return {
        id: elem.id,
        comentario: elem.comment,
        rating: elem.Rating,
        dateTime: elem.dateTime,
        clientId: elem.clientId,
        client: elem.client.name,
        accommodationId: elem.accommodationId,
        accommodation: elem.accommodation.name,
        image: elem.accommodation.image,
      };
    });
    return { msg: hostIdAccReviews };

  }
  const accFound = await prisma.accommodation.findFirst({
    where: {
      id: accommodationId,
    },
  });
  if (!accFound) return { error: "no hay hospedaje con ese id" };
  const reviewFound = await prisma.review.findMany({
    where: {
      accommodationId: accommodationId,
    },
    include: {
      accommodation: true,
      client: true,
    },
    orderBy: {
      dateTime: "desc",
    },
  });

  if (!reviewFound.length) {
    return {
      error: `No hay Reviews relacionados al acc ${accommodationId}`,
    };
  }

  const formatted = reviewFound.map((elem) => {
    return {
      id: elem.id,
      comentario: elem.comment,
      rating: elem.Rating,
      dateTime: elem.dateTime,
      clientId: elem.clientId,
      client: elem.client.name,
      accommodationId: elem.accommodationId,
      accommodation: elem.accommodation.name,
      image: elem.accommodation.image,
    };
  });
  return { msg: formatted };

};

export default getReviews;
