import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { pool } from "../db.js";

dotenv.config();
const Secret = process.env.SECRET_KEY;

//-----------------Crear datos --------------------//
export const postLogin = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    const [users] = await pool.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = ?",
      [nombre]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const user = users[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    const token = JWT.sign(
      { id: user.id_usuario, nombre: user.nombre_usuario, rol: user.rol },
      Secret,
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,       // En desarrollo
      sameSite: "lax",     // Cambia de "None" a "lax"
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "Login exitoso",
      id: user.id_usuario,
      nombre: user.nombre_usuario,
      rol: user.rol,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al hacer login" });
  }
};

//----------------verificando token -----------------------------//

export const verificando = (req, res, next) => {
  const token = req.cookies.token;
  console.log(req.cookies)
  

  if (!token) return res.status(403).json({ message: "Token requerido" });

  JWT.verify(token, Secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });

    req.user = decoded;
    next();
  });
};

//-----------------verificando rol ---------------//

export const isAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res
      .status(403)
      .json({ message: "Acceso denegado. Se requiere rol de administrador." });
  }
  next();
};

//--------------cerrar cession -----------------//

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada" });
};
