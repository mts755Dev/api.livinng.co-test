import { Router } from "express";
import { getOccupancyByIdHandler } from "../../../handlers/host.handler/occupancy.handler/getOccupancyByIdHandler.js";
import {deleteOccupancyHandler} from "../../../handlers/host.handler/occupancy.handler/deleteOccupancyHandler.js"
import { updateOccupancyHandler } from "../../../handlers/host.handler/occupancy.handler/updateOccupancyHandler.js"
import { createOccupancyHandler } from "../../../handlers/host.handler/occupancy.handler/createOccupancyHandler.js";

const router = Router();

router.get('/:accommodationId', getOccupancyByIdHandler)
router.delete('/:id', deleteOccupancyHandler)
router.put('/modify', updateOccupancyHandler)
router.post('/', createOccupancyHandler)

export default router;
