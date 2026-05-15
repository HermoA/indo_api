import { pool } from "../db.js";
import bcrypt from "bcryptjs";

//-----------------Recivir datos --------------------//
export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM usuarios");
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

//-----------------Recivir un dato --------------------//
export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT created_at, email_usuario, id_usuario, nombre_usuario , rol FROM usuarios WHERE id_usuario = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

//-----------------Crear datos --------------------//
export const postUser = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si el usuario ya existe
    const [users] = await pool.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ?",
      [nombre]
    );
    if (users.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre_usuario, email_usuario, password, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, hashedPassword, rol]
    );

    res.json({
      message: "Usuario creado correctamente",
      id: result.insertId,
      nombre,
      email,
      rol,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

//-----------------Actualizar datos --------------------//
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_usuario, email_usuario, password } = req.body;

    // Obtener datos actuales del usuario
    const [users] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [id]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const currentUser = users[0];

    // Si no se manda alguno de los datos, conservar el actual
    const updatedNombre = nombre_usuario ?? currentUser.nombre_usuario;
    const updatedEmail = email_usuario ?? currentUser.email_usuario;
    const updatedPassword = password
      ? await bcrypt.hash(password, 10)
      : currentUser.password;

    // Ejecutar la actualización
    await pool.query(
      "UPDATE usuarios SET nombre_usuario = ?, email_usuario = ?, password = ? WHERE id_usuario = ?",
      [updatedNombre, updatedEmail, updatedPassword, id]
    );

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};
//-----------------Actualizar rol --------------------//
export const updateUserRole = async (req, res) => {
  
  try {
    // Verificar si el usuario existe
    const [users] = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [req.params.id]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar solo el rol
    await pool.query("UPDATE usuarios SET ? WHERE id_usuario = ?", [
      req.body,
      req.params.id,
    ]);
    res.json({ message: "Rol actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol del usuario" });
  }
};

//-----------------Eliminar datos --------------------//
export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM usuarios WHERE id_usuario = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
