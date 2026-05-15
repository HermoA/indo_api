import { pool } from "../db.js";

//
//-----------------Recivir datos --------------------//
export const getContacto = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM contacto ORDER BY id_contacto DESC"
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};

//-----------------Recivir un dato --------------------//

export const getContactoId = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM contacto WHERE id_contacto = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "dato no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el dato" });
  }
};
///-----------------mesaje leido --------------------//

export const getLeidos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM contacto WHERE leido = 1");

    if (result.length === 0) {
      return res.status(404).json({ message: "no existe mesajes leidos" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el dato" });
  }
};
///-----------------mesaje no leido --------------------//

export const getNoLeidos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM contacto WHERE leido = 0");

    if (result.length === 0) {
      return res.status(404).json({ message: "todos los mesajes leidos" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el dato" });
  }
};
//-----------------Crear datos --------------------//
export const postContacto = async (req, res) => {
  try {
    const { nombre, correo, telefono, asunto, mensaje } = req.body;
    const [result] = await pool.query(
      "INSERT INTO contacto (nombre, correo, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)",
      [nombre, correo, telefono, asunto, mensaje]
    );

    res.json({
      message: "mensaje creado correctamente",
      id_contacto: result.insertId,
      nombre,
      correo,
      telefono,
      asunto,
      mensaje,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el dato" });
  }
};
//-----------------estado dato --------------------//

export const leido = async (req, res) => {
  const [result] = await pool.query(
    "UPDATE contacto SET leido = 1 WHERE  id_contacto = ?",
    [req.params.id]
  );
  const [dato] = await pool.query(
    "SELECT * FROM contacto WHERE id_contacto = ?",
    [req.params.id]
  );
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "dato no encontrado" });
  }
  res.json(dato);
};

//-----------------eliminar dato --------------------//

export const deleteContacto = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM contacto WHERE id_contacto = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "dato no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el dato" });
  }
};
