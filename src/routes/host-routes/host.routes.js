import { Router } from "express";
import reviewsRoutes from '../host-routes/reviews-routes/reviews.routes.js';
import reservationsRoutes from "./reservations-routes/reservations.routs.js";
import accRoutes from "./accommodations-routes/accommodations.routes.js";
import occupancyRoutes from "./occupancy-routes/occupancy.routes.js"

const router = Router();

router.use('/acc', accRoutes)
router.use('/reservations', reservationsRoutes)
router.use('/reviews', reviewsRoutes)
router.use("/occupancy", occupancyRoutes);

export default router;
