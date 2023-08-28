import { Router } from "express";
import {getReservationClientIdHandler} from "../../../handlers/client.handler/reservation.handler/getReservationClientIdHandler.js";
import {createReservationClientHandler} from "../../../handlers/client.handler/reservation.handler/createReservationClientHandler.js";
import {updateReservationClientHandler} from '../../../handlers/client.handler/reservation.handler/updateReservationClientHandler.js';
import { getReservatioIdHandler } from "../../../handlers/client.handler/reservation.handler/getReservatioIdHandler.js";
const router = Router();

router.get('/detail/:reservationId', getReservatioIdHandler)
router.get('/', getReservationClientIdHandler)
router.post('/', createReservationClientHandler)
router.put('/modify', updateReservationClientHandler)


export default router;
