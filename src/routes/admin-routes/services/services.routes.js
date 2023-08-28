import { Router } from "express";
import { getAllServiceHandler } from "../../../handlers/admin.handler/services.handler/getAllServiceHandler.js";
import { createServiceHandler } from "../../../handlers/admin.handler/services.handler/createServiceHandler.js";
import { deleteServiceHandler } from "../../../handlers/admin.handler/services.handler/deleteServiceHandler.js";

const router = Router();

router.get("/", getAllServiceHandler);
router.post("/", createServiceHandler);
router.delete('/:id', deleteServiceHandler)

export default router;