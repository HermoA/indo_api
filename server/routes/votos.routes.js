import { Router } from "express";
import {
  getVotos,
  getVoto,
  postVoto,
  putVoto,
  deleteVoto,
} from "../controllers/votos.controllers.js";

const router = Router();

router.get("/votos", getVotos);
router.get("/voto/:id", getVoto);
router.post("/voto", postVoto);
router.put("/voto/:id", putVoto);
router.delete("/voto/:id", deleteVoto);

export default router;
