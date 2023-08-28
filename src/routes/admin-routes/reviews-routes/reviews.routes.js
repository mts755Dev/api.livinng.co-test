import { Router } from "express";
import getAllReviewHandler from "../../../handlers/admin.handler/reviews/getAllReviewsHandler.js";
import deleteReviewHandler from "../../../handlers/admin.handler/reviews/deleteReviewHandler.js";
import filterReviewHandler from "../../../handlers/admin.handler/reviews/filterReviewHandler.js";


const router = Router();

router.get('/', getAllReviewHandler)
router.delete('/:id', deleteReviewHandler)
router.post('/', filterReviewHandler)

export default router;