import { pool } from "../db.js";
import ftp from "basic-ftp";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

//-----------------Recivir datos --------------------//
export const getNoticias = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM noticias ORDER BY id_noticia DESC"
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las noticias" });
  }
};
//-----------------Recivir datos por categoria --------------------//
export const getCategoriaNoticias = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM noticias WHERE categoria = ? ORDER BY id_noticia DESC",
      [req.params.categoria]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las noticias" });
  }
};

//-----------------Recivir un dato --------------------//
export const getNoticia = async (req, res) => {
  const { id, titulo } = req.params;

  try {
    const [result] = await pool.query(
      "SELECT * FROM noticias WHERE id_noticia = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    const noticia = result[0];

    // Si hay título en la URL, validar que coincida con el de la DB
    if (titulo) {
      const slugify = (str) =>
        str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // elimina acentos
          .replace(/\s+/g, "-") // espacios por guiones
          .replace(/[^a-z0-9-]/g, ""); // elimina caracteres especiales

      const slugDB = slugify(noticia.titulo);
      const slugURL = slugify(titulo);

      if (slugDB !== slugURL) {
        return res.status(400).json({ message: "El título no coincide con la noticia" });
      }
    }

    res.json(noticia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la noticia" });
  }
};
//-----------------Crear datos --------------------//
export const postNoticia = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const client = new ftp.Client();
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false, // true si tu FTP es FTPS
    });

    await client.uploadFrom(filePath, `/noticias/${fileName}`);
    fs.unlinkSync(filePath); // Borra archivo temporal

    const img = `https://www.indoamericalaradio.com/uploadftp/noticias/${fileName}`;
    console.log(img);

    const {
      titulo,
      lead,
      categoria,
      sub_categoria,
      id_usuario_noticia,
      autor,
      cuerpo,
      publicacion,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO noticias (titulo, lead, categoria, sub_categoria, id_usuario_noticia, autor, cuerpo, publicacion, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        titulo,
        lead,
        categoria,
        sub_categoria,
        id_usuario_noticia,
        autor,
        cuerpo,
        publicacion,
        img,
      ]
    );
    console.log(result);

    res.json({
      message: "Noticia creada correctamente",
      id_noticia: result.insertId,
      titulo,
      lead,
      categoria,
      sub_categoria,
      id_usuario_noticia,
      autor,
      cuerpo,
      publicacion,
      img,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la noticia" });
  }
};

//-----------------Actualizar datos --------------------//
export const putNoticia = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE noticias SET ? WHERE id_noticia = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la noticia" });
  }
};

//-----------------Eliminar datos --------------------//
export const deleteNoticia = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT img FROM noticias WHERE id_noticia = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "noticia no encontrada" });
    }

    const logoUrl = rows[0].img;
    const fileName = logoUrl ? logoUrl.split("/").pop() : null;
    console.log(`/noticias/${fileName}`);

    if (fileName) {
      const client = new ftp.Client();
      await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false, // true si tu FTP es FTPS
      });

      await client.remove(`/noticias/${fileName}`);
      client.close();
    }

    const [result] = await pool.query(
      "DELETE FROM noticias WHERE id_noticia = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la noticia" });
  }
};
//-----------------eliminar imgen de ftp--------------------//
export const deleteImgNoticia = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT img FROM noticias WHERE id_noticia = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "imagen de noticia no encontrada" });
    }

    const logoUrl = rows[0].img;
    const fileName = logoUrl ? logoUrl.split("/").pop() : null;
    console.log(`/noticias/${fileName}`);

    const [result] = await pool.query(
      "UPDATE noticias SET img = NULL WHERE id_noticia = ?",
      [req.params.id]
    );
    if (fileName) {
      const client = new ftp.Client();
      await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false, // true si tu FTP es FTPS
      });

      await client.remove(`/noticias/${fileName}`);
      client.close();
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la noticia" });
  }
};
//-----------------actualizar imgen de ftp--------------------//
export const updateImgNoticia = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const client = new ftp.Client();
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false, // true si tu FTP es FTPS
    });

    await client.uploadFrom(filePath, `/noticias/${fileName}`);
    fs.unlinkSync(filePath); // Borra archivo temporal

    const img = `https://www.indoamericalaradio.com/uploadftp/noticias/${fileName}`;
    const id_noticia = req.params.id;
    console.log(img);
    console.log(id_noticia);

    const [result] = await pool.query(
      "UPDATE noticias SET img = ? WHERE id_noticia = ?",
      [img, id_noticia]
    );
    console.log(result);

    res.json({
      message: "Noticia actualizada correctamente",
      id_noticia,
      img,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la noticia" });
  }
};
