import { Router } from "express";
import adminAcc from './accommodations-routes/adminAcc.routes.js';
import clientsRoutes from './clients-routes/clients.routes.js'
import hostRoutes from './hosts-routes/hosts.routes.js'
import adminSize from "../../routes/admin-routes/size-routes/size.routes.js"
import accTypeRoutes from "../../routes/admin-routes/accType-routes/accType.routes.js"
import services from "../../routes/admin-routes/services/services.routes.js"
import reviews from "./reviews-routes/reviews.routes.js"
import state from "../../routes/admin-routes/state-routes/state.routes.js"
import reservations from "../../routes/admin-routes/reservations-routes/reservations.routs.js"

const router = Router()

router.use("/reservations", reservations)
router.use("/host", hostRoutes)
router.use("/clients", clientsRoutes)
router.use("/reviews",reviews);
router.use("/acc",adminAcc);
router.use("/size",adminSize);
router.use("/accType",accTypeRoutes);
router.use("/services",services);
router.use("/state",state);
export default router;
