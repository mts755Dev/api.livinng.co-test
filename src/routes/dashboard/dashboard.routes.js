import { Router } from "express";
import { prisma } from "../../db.js";
import { loginDashboard } from "../../handlers/loginDashboard/login.js";
import registerDashboard from '../../handlers/loginDashboard/register.js'
import { logout } from "../../handlers/loginDashboard/logout.js";

const router = Router();

router.post('/login', loginDashboard)
router.post('/register', registerDashboard)
router.get('/logout',logout)

export default router;