import { Router } from "express";
import { createStateHandler } from "../../../handlers/admin.handler/state.handler/createStateHandler.js";
import { deleteStateHandler } from "../../../handlers/admin.handler/state.handler/deleteStateHandler.js";

const router = Router();

router.post('/', createStateHandler)
router.delete('/:name', deleteStateHandler)

export default router;
