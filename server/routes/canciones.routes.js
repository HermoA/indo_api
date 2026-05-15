import { Router } from "express";
import {
  getCanciones,
  getCancion,
  postCancion,
  putCancion,
  deleteCancion,
  searchCanciones,
  getCancionesSinRanking,
} from "../controllers/canciones.controllers.js";

const router = Router();

router.get("/canciones", getCanciones);
router.get("/cancion/:id", getCancion);
router.get("/canciones/search", searchCanciones);
router.get("/canciones/sin-ranking", getCancionesSinRanking);
router.post("/cancion", postCancion);
router.put("/cancion/:id", putCancion);
router.delete("/cancion/:id", deleteCancion);

export default router;
