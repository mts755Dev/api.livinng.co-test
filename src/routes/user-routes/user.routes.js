import { Router } from "express";
import accRoutes from "./accommodations.routes.js/accommodations.routes.js";
import utils from "./utils.routes/utils.routes.js";

const router = Router();

router.use('/acc', accRoutes)
router.use('/utils', utils)

export default router;