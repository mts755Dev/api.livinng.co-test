import { Router } from "express";
import { getAllAccTypeHandler } from "../../../handlers/admin.handler/accType/getAllAccTypeHandler.js";
import { getAllAccSizeHandler } from "../../../handlers/admin.handler/size.handler/getAllAccSizeHandler.js";
import { getAllServiceHandler } from "../../../handlers/admin.handler/services.handler/getAllServiceHandler.js";

const router = Router();


router.get('/acctype', getAllAccTypeHandler)
router.get('/size', getAllAccSizeHandler)
router.get("/services", getAllServiceHandler);

export default router;