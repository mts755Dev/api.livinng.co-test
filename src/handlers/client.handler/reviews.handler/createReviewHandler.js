import createReviewAcc from '../../../controllers/client/reviews/createReview.js'

export const createReviewsHandler = async (req, res) => {
  const info = req.body;
  try {
    const createReview = await createReviewAcc(info, req.usuario.email);
    if (createReview.error) return res.status(404).send(createReview.error);
    return res.status(200).send(createReview.msg);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
