import { Router } from "express";
import {
  getRankings,
  nombreRanking,
  cancionesRanking,
  postRanking,
  putRanking,
  deleteRanking,
} from "../controllers/ranking.controllers.js";

const router = Router();

router.get("/ranking", getRankings);
router.get("/rankin/nombre", nombreRanking);
router.get("/rankin/canciones", cancionesRanking);
router.post("/ranking", postRanking);
router.put("/ranking/:id", putRanking);
router.delete("/ranking/:id", deleteRanking);

export default router;
