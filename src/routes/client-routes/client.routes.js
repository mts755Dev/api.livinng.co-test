import { Router } from "express";
import favoritesRoutes from '../client-routes/favorites-routes/favorites.routes.js';
import reviewsRoutes from '../client-routes/reviews-routes/reviews.routes.js';
import reservationsRoutes from '../client-routes/reservations-routes/reservationClient.routes.js';
const router = Router();


router.use('/reservations', reservationsRoutes)
router.use('/reviews', reviewsRoutes)
router.use('/fav', favoritesRoutes)

export default router;
