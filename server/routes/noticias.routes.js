import { Router } from "express";
import multer from "multer";
import {
  getNoticias,
  getNoticia,
  getCategoriaNoticias,
  postNoticia,
  putNoticia,
  deleteNoticia,
  deleteImgNoticia,
  updateImgNoticia,
} from "../controllers/noticia.controllers.js";
import { verificando, isAdmin } from "../controllers/login.controllers.js";

const router = Router();
const upload = multer({ dest: "uploadftp/" });

router.get("/noticias", getNoticias);
router.get("/noticia/:id/:titulo?", getNoticia);
router.get("/noticias/:categoria", getCategoriaNoticias);
router.post("/noticia", upload.single("img"), postNoticia);
router.put("/noticia/:id", putNoticia);
router.put("/noticia/img/:id", upload.single("img"), updateImgNoticia);
router.delete("/noticia/:id", deleteNoticia);
router.delete("/noticia/img/:id", deleteImgNoticia);

export default router;
