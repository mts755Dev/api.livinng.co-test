import { Router } from "express";
import loginRoutes from "./all-routes/login.routes.js";
import epaycoRoutes from '../routes/all-routes/epayco.routes.js';
import adminRoutes from "./admin-routes/admin.routes.js";
import hostRoutes from "./host-routes/host.routes.js";
import clientRoutes from '../routes/client-routes/client.routes.js';
import userRoutes from "./user-routes/user.routes.js";
import dashboardLogin from "./dashboard/dashboard.routes.js"
//* poner antes de /host
import { MiddlewareAnfitrion } from "../utils/auth/authHost.js";
//* poner antes de /admin
import { MiddlewareAdmin } from "../utils/auth/authAdmin.js";
//* poner antes de /client
import { autenticacionMiddleware } from "../utils/auth/auth.js";

const router = Router();
router.use("/dashboard", dashboardLogin);
router.use("/user", userRoutes);
router.use("/epayco", epaycoRoutes);
router.use("/host", MiddlewareAnfitrion, hostRoutes);
router.use("/login",autenticacionMiddleware, loginRoutes);
router.use("/admin",MiddlewareAdmin ,adminRoutes);
router.use("/client", autenticacionMiddleware, clientRoutes);
router.all('*', (req, res) => {
    res.status(404).send(`No existe la ruta: ${req.method} ${req.originalUrl}`);
});

export default router;
