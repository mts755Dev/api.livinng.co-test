import { Router } from "express";
import { getByHostAndFilterHandler } from "../../../handlers/host.handler/reservations.handler/getByHost-filter-reservation.handler.js";
import { updateReservationsHandler } from "../../../handlers/host.handler/reservations.handler/updateReservations.handler.js"

const router = Router();

router.post('/', getByHostAndFilterHandler);
router.put('/', updateReservationsHandler);

export default router;