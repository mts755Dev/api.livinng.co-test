import { Router } from "express";
import {epaycoTokenHandler} from '../../handlers/epaycoHandler/epaycoTokenHandler.js';
import crearToken from '../../utils/token/crearToken.js';
import deleteToken from '../../utils/token/deleteToken.js';
import checkPaymentStatus from "../../utils/epayco/checkPaymentStatus.js";
const router = Router();

router.post("/generatePayment", epaycoTokenHandler );
router.get("/crear", crearToken);
router.get("/delete",deleteToken );
router.get("/check", checkPaymentStatus );
export default router;
