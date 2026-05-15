import { Router } from "express";
import {
  getUsers,
  getUser,
  postUser,
  updateUser,
  updateUserRole,
  deleteUser,
} from "../controllers/usuario.controllers.js";
import { verificando } from "../controllers/login.controllers.js";

const router = Router();

router.get("/usuarios", getUsers);
router.get("/usuario/:id", getUser);
router.post("/usuario", postUser);
router.put("/usuario/:id/rol", updateUserRole);
router.put("/usuario/:id", updateUser);
router.delete("/usuario/:id", deleteUser);

export default router;
