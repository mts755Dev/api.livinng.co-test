import { Router } from "express";
import { getAllClientsHandler } from "../../../handlers/admin.handler/clients.handler/getAllClientsHandler.js";
import { clientsFilterHandler } from "../../../handlers/admin.handler/clients.handler/clientsFilterHandler.js";
import { putUserDisabledHandler } from '../../../handlers/admin.handler/clients.handler/updateClientDisabled.js';

const router = Router();

router.get('/', getAllClientsHandler)
router.post('/filter', clientsFilterHandler)
router.put("/disabled", putUserDisabledHandler);


export default router;
