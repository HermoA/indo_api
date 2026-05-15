import { Router } from "express";
import { getItunesArtwork } from "../controllers/itunes.controllers.js";

const router = Router();

router.get("/itunes/artwork", getItunesArtwork);

export default router;