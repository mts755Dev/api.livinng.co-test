import { Router } from "express";
import getReviewHandler from "../../../handlers/host.handler/reviews.handler/getHostReviewHandler.js";



const router = Router();

 router.post('/', getReviewHandler)

export default router;
