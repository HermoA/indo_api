import { Router } from "express";
import { postLogin, logout } from "../controllers/login.controllers.js";

const router = Router();

router.post("/login", postLogin);
router.post("/logout", logout);

export default router;
