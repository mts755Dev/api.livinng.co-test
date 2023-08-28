import { Router } from "express";
import { prisma } from "../../db.js";
import { loginHandler } from "../../handlers/loginHandler/login.js";

const router = Router();

router.get('/', loginHandler)

export default router;
