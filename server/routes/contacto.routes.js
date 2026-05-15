import { Router } from "express";
import {
  getContacto,
  getContactoId,
  getLeidos,
  getNoLeidos,
  postContacto,
  leido,
  deleteContacto,
} from "../controllers/contacto.controllers.js";

const router = Router();

router.get("/mensajes", getContacto);
router.get("/mensaje/:id", getContactoId);
router.get("/mensajes/leidos", getLeidos);
router.get("/mensajes/noleidos", getNoLeidos);
router.put("/mensaje/:id", leido);
router.post("/mensaje", postContacto);
router.delete("/mensaje/:id", deleteContacto);

export default router;
