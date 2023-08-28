import {Router} from "express";
import {getReviewsByUserId} from "../../../handlers/client.handler/reviews.handler/getReviewsUserId.js";
import {createReviewsHandler} from "../../../handlers/client.handler/reviews.handler/createReviewHandler.js";

const router = Router();

router.get('/', getReviewsByUserId);
router.post('/create', createReviewsHandler);

export default router;
