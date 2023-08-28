import { prisma } from '../../../db.js';

const getFavUserId = async (clientId) => {
  const favClientId = await prisma.favorites.findMany({
    where: {
      clientId: clientId.id,
    }, include : {
       Client: true,
       Accommodation:true,
    },
  });

  if (!favClientId.length) {
    return { error: "No hay favoritos relacionados al usuario  "};
  }
   const favoritesWithRating = [];
   for (const fav of favClientId) {
     const accommodationId = fav.accommodationId;
     const rating = await prisma.review.findFirst({
       where: {
        clientId: clientId.id,
        accommodationId : accommodationId,
       },
       select: {
         Rating: true,
       },
     });
     const favoriteWithRating = {
       id: fav.id,
       name: fav.Accommodation.name,
       image: fav.Accommodation.image,
       rating: rating ? rating.Rating : null,
     };
     favoritesWithRating.push(favoriteWithRating);
   }
   return {msg :favoritesWithRating};
};

export default getFavUserId;
