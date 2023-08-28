import { Router } from "express";
import { getAccDisabledHandler } from '../../../handlers/admin.handler/accDisabledHandler.js';
import { putAccDisabledHandler } from '../../../handlers/admin.handler/putAccDisabledHandler.js';
import { deleteAccHandler } from "../../../handlers/admin.handler/acc.handler/deleteAccHandler.js";
import accFilterHandler from "../../../handlers/admin.handler/acc.handler/filterAccHandler.js";

const router = Router();


router.post("/filter", accFilterHandler)
router.get("/disabled", getAccDisabledHandler);
router.put("/disabled", putAccDisabledHandler);
router.delete('/:id', deleteAccHandler)

export default router;
