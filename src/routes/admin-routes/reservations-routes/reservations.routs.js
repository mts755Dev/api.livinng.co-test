import { Router } from "express";
import { getReservatiosAndFilterHandler } from "../../../handlers/admin.handler/reservations.handler/getReservationsHandler.js";


const router = Router();

router.post('/', getReservatiosAndFilterHandler)

export default router;