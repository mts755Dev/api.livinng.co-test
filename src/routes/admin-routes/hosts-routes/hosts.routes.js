import { Router } from "express";
import { getAllHostsHandler } from "../../../handlers/admin.handler/hosts.handler/getAllHostsHandler.js";
import { createHostHandler } from "../../../handlers/admin.handler/hosts.handler/createHostsHandler.js";
import { putUserDisabledHandler } from "../../../handlers/admin.handler/hosts.handler/putHostDisabledHandler.js";

const router = Router();

router.get('/', getAllHostsHandler)
router.post('/', createHostHandler)
router.put('/disabled', putUserDisabledHandler)

export default router;
