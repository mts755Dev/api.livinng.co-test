import deleteReview from "../../../controllers/admin/reviews/deleteReview.js";

const deleteReviewHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const allReviews = await deleteReview(id)
        if (allReviews.error) return res.status(404).send(allReviews.error)
        return res.status(200).send(allReviews.msg)
    } catch (error) {
        res.status(400).send(error.message)
    }
};
export default deleteReviewHandler