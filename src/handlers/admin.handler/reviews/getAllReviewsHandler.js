import getAllReviews from "../../../controllers/admin/reviews/getAllReview.js";

const getAllReviewHandler = async (req, res) => {
    try {
        const allReviews = await getAllReviews()
        if (allReviews.error) return res.status(404).send(allReviews.error)
        return res.status(200).send(allReviews.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};
export default getAllReviewHandler