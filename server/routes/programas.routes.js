import { Router } from "express";
import multer from "multer";
import {
  getProgramas,
  getPrograma,
  getProgramasDias,
  getActual,
  postPrograma,
  putProgama,
  deleteProgama,
  uploadNewImagePrograma,
  deleteImagePrograma,
} from "../controllers/programa.controllers.js";
import { verificando, isAdmin } from "../controllers/login.controllers.js";

const router = Router();
const upload = multer({ dest: "uploadftp/" });

router.get("/programas", getProgramas);
router.get("/programadias", getProgramasDias);
router.get("/programa/:id", getPrograma);
router.get("/actual", getActual);
router.post("/programa", upload.single("image"), postPrograma);
router.put("/programa/:id", putProgama);
router.delete("/programa/:id", deleteProgama);
router.put("/programa/uploadimage/:id", upload.single("image"), uploadNewImagePrograma);
router.put("/programa/deleteimage/:id", deleteImagePrograma);

export default router;
