import { Router } from "express";

import { getAllFavorites } from "../../../handlers/client.handler/favorites.handler/getFavoritesHandler.js";
import {createFavorites } from "../../../handlers/client.handler/favorites.handler/createFavoritesHandler.js";
import {deleteFavoritesClientIdHandler} from "../../../handlers/client.handler/favorites.handler/deleteFavoritesHandler.js";


const router = Router();


router.post('/create', createFavorites)
router.get('/', getAllFavorites)
router.delete('/:id', deleteFavoritesClientIdHandler)


export default router;
