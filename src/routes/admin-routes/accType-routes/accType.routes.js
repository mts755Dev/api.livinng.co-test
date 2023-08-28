import { Router } from "express";
import { createAccTypeHandler } from "../../../handlers/admin.handler/accType/createAccTypeHandler.js";
import { getAllAccTypeHandler } from "../../../handlers/admin.handler/accType/getAllAccTypeHandler.js";
import { deleteAccTypeHandler } from "../../../handlers/admin.handler/accType/deleteAccTypeHandler.js";

const router = Router();


router.post('/', createAccTypeHandler)
router.get('/', getAllAccTypeHandler)
router.delete('/:id', deleteAccTypeHandler)


export default router;