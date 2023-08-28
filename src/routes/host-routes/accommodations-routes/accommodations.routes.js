import { Router } from "express";
import { getAccByHostIdHandler } from "../../../handlers/host.handler/acc.handler/getAccByHostIdHandler.js";
import { createAccHandler } from "../../../handlers/host.handler/acc.handler/createAccHandler.js";
import accFilterHandler from "../../../handlers/host.handler/acc.handler/accFilterHandler.js";
import { updateAccHandler } from "../../../handlers/host.handler/acc.handler/updateAccHandler.js";


const router = Router();
router.get('/:id', getAccByHostIdHandler)
router.post('/filter', accFilterHandler)
router.post('/', createAccHandler)
router.post('/update', updateAccHandler)

export default router;
