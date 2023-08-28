import { Router } from "express";
import getAccommodationsHandler from "../../../handlers/user.handler/accommodations.handler/getAllAccommodation.js";
import accFilterHandler from "../../../handlers/user.handler/accommodations.handler/accFilterHandler.js";
import getAccommodationById from "../../../handlers/user.handler/accommodations.handler/getAccommodationById.js";
import getAccommodationByName from "../../../handlers/user.handler/accommodations.handler/getAccommodationByName.js";
import orderAccommodationHandler from "../../../handlers/user.handler/accommodations.handler/accOrderHandler.js";


const router = Router();

router.get('/', getAccommodationsHandler)
router.post('/filter', accFilterHandler)
router.get('/order', orderAccommodationHandler)
router.get('/:id', getAccommodationById)
router.get('/', getAccommodationByName)

export default router;