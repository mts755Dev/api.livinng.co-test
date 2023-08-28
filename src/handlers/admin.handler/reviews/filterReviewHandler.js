import filterReview from "../../../controllers/admin/reviews/filterReview.js";

const filterReviewHandler = async (req, res) => {
    try {
        const allReviews = await filterReview(req.body)
        if (allReviews.error) return res.status(404).send(allReviews.error)
        return res.status(200).send(allReviews.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};
export default filterReviewHandler