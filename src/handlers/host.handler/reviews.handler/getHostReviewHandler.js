import getReviews from "../../../controllers/host/reviews/getReviews.js";


const createReviewHandler = async (req, res) =>{
  const info = req.body;
  try {
    const createReview = await getReviews(info);
    if (createReview.error) return res.status(404).send(createReview.error);
    return res.status(200).send(createReview.msg);
  } catch (error) {
    res.status(400).send(error.message);
  }
}


export default createReviewHandler
