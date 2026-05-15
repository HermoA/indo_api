import { pool } from "../db.js";
import ftp from "basic-ftp";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

//-----------------Recivir datos --------------------//
export const getProgramas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM programas WHERE dias LIKE CONCAT('%', CASE DAYNAME(CURDATE()) WHEN 'Monday' THEN 'Lu' WHEN 'Tuesday' THEN 'Ma' WHEN 'Wednesday' THEN 'Mi' WHEN 'Thursday' THEN 'Ju' WHEN 'Friday' THEN 'Vi' WHEN 'Saturday' THEN 'Sa' WHEN 'Sunday' THEN 'Do' END, '%') ORDER BY horario_in ASC"
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};
//-----------------Recivir datos por dia --------------------//
export const getProgramasDias = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM programas ORDER BY horario_in ASC"
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};
//-----------------Recivir actual --------------------//
export const getActual = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT *
      FROM programas
      WHERE FIND_IN_SET(
              CASE DAYOFWEEK(CURDATE())
                  WHEN 1 THEN 'Do'
                  WHEN 2 THEN 'Lu'
                  WHEN 3 THEN 'Ma'
                  WHEN 4 THEN 'Mi'
                  WHEN 5 THEN 'Ju'
                  WHEN 6 THEN 'Vi'
                  WHEN 7 THEN 'Sa'
              END,
              REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(dias, '-', ','), ' ', ''), 'á', 'a'), 'Á', 'A'), '_', ',')
          ) > 0
        AND (
            (horario_in < horario_out AND CURRENT_TIME BETWEEN horario_in AND horario_out)
            OR
            (horario_in > horario_out AND (CURRENT_TIME >= horario_in OR CURRENT_TIME <= horario_out))
        )
    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los programa actual" });
  }
};

//-----------------Recivir un dato --------------------//
export const getPrograma = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM programas WHERE id_programa = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Programa no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

//-----------------Crear datos --------------------//
export const postPrograma = async (req, res) => {
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

    await client.uploadFrom(filePath, `/programas/${fileName}`);
    fs.unlinkSync(filePath); // Borra archivo temporal

    const logo_programa = `https://www.indoamericalaradio.com/uploadftp/programas/${fileName}`;

    const {
      nombre_programa,
      id_usuario_programas,
      conductor,
      descripcion,
      dias,
      horario_in,
      horario_out,
    } = req.body;
    const [result] = await pool.query(
      "INSERT INTO programas (nombre_programa, id_usuario_programas, conductor, descripcion, dias, horario_in, horario_out, logo_programa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombre_programa,
        id_usuario_programas,
        conductor,
        descripcion,
        dias,
        horario_in,
        horario_out,
        logo_programa,
      ]
    );
    console.log(result);

    res.json({
      message: "programa creado correctamente con imagen",
      id_programa: result.insertId,
      nombre_programa,
      id_usuario_programas,
      conductor,
      descripcion,
      dias,
      horario_in,
      horario_out,
      logo_programa,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el programa" });
  }
};
//------------------delete imagen------------------//
export const deleteImagePrograma = async (req, res) => {
  console.log("entro a delete");
  
  try {
    const [rows] = await pool.query(
      "SELECT logo_programa FROM programas WHERE id_programa = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Programa no encontrado" });
    }

    const logoUrl = rows[0].logo_programa;
    const fileName = logoUrl ? logoUrl.split("/").pop() : null;
    console.log(`/programas/${fileName}`);

    if (fileName) {
      const client = new ftp.Client();
      await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false, // true si tu FTP es FTPS
      });
      await client.remove(`/programas/${fileName}`);
      client.close();
    }

    const [result] = await pool.query(
      "UPDATE programas SET logo_programa = NULL WHERE id_programa = ?",
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Programa no encontrado" });
    }
    res.json({ message: "Imagen del programa eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la imagen del programa" });
  }
};
//-----------------subir nueva imagen--------------------//
export const uploadNewImagePrograma = async (req, res) => {
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
    await client.uploadFrom(filePath, `/programas/${fileName}`);
    fs.unlinkSync(filePath); // Borra archivo temporal
    const logo_programa = `https://www.indoamericalaradio.com/uploadftp/programas/${fileName}`;
    const id_programa = req.params.id;
    console.log(logo_programa);
    console.log(id_programa);
    const [result] = await pool.query(
      "UPDATE programas SET logo_programa = ? WHERE id_programa = ?",
      [logo_programa, id_programa]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Programa no encontrado" });
    }
    res.json({
      message: "Imagen del programa actualizada correctamente",
      logo_programa,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la imagen del programa" });
  }
};
//-----------------Actualizar datos --------------------//
export const putProgama = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE programas SET ? WHERE id_programa = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el programa" });
  }
};

//-----------------Eliminar datos --------------------//
export const deleteProgama = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT logo_programa FROM programas WHERE id_programa = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Programa no encontrado" });
    }

    const logoUrl = rows[0].logo_programa;
    const fileName = logoUrl ? logoUrl.split("/").pop() : null;

    console.log(`/programas/${fileName}`);

    if (fileName) {
      const client = new ftp.Client();
      await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: false, // true si tu FTP es FTPS
      });

      await client.remove(`/programas/${fileName}`);
      client.close();
    }

    const [result] = await pool.query(
      "DELETE FROM programas WHERE id_programa = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Programa no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el Programa" });
  }
};
