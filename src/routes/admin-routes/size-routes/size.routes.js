import { Router } from "express";
import { createAccSizeHandler } from "../../../handlers/admin.handler/size.handler/createAccSizeHandler.js";
import { getAllAccSizeHandler } from "../../../handlers/admin.handler/size.handler/getAllAccSizeHandler.js";
import { deleteAccSizeHandler } from "../../../handlers/admin.handler/size.handler/deleteAccSizeHandler.js";


const router = Router();


router.post('/', createAccSizeHandler)
router.get('/', getAllAccSizeHandler)
router.delete('/:id', deleteAccSizeHandler)


export default router;