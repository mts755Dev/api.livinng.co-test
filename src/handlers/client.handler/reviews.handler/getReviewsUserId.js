import getUserReviews from "../../../controllers/client/reviews/getUserReviews.js";
import { prisma } from "../../../db.js";

export const getReviewsByUserId = async (req, res) => {
  
  try {
      const client = await prisma.client.findFirst({
        where: {
          email: req.usuario.email
        }
      })
      const reviewByAcc = await getUserReviews(client.id);
      if (reviewByAcc.error){
        return res.status(404).send(reviewByAcc.error);
      }
      return res.status(200).send(reviewByAcc.msg);
    } catch (error) {
      return res.status(400).send(error.message);
    }

  };
