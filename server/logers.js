import dotenv from "dotenv";
import fs from "fs";
import { createPool } from "mysql2/promise";

dotenv.config();

// === Utilidad para timestamp ===
const timestamp = () => new Date().toISOString();

// === Redirigir logs a archivo ===
const logStream = fs.createWriteStream("app.log", { flags: "a" });

console.log = function (msg) {
  logStream.write(`[${timestamp()}] [LOG] ${msg}\n`);
};
console.error = function (msg) {
  logStream.write(`[${timestamp()}] [ERROR] ${msg}\n`);
};

// === Validar variables de entorno ===
["HOST", "PORTDB", "USER", "PASSWORD", "DATABASE"].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`⚠️ Falta la variable de entorno: ${key}`);
  }
});

// === Configuración de la base de datos ===
const config = {
  host: process.env.HOST,
  port: process.env.PORTDB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

// === Crear pool ===
const pool = createPool(config);

// === Verificar conexión al iniciar ===
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Conectado a MySQL correctamente");
    conn.release();
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error.stack);
  }
})();

// === Cerrar pool al detener la app ===
process.on("SIGINT", async () => {
  try {
    await pool.end();
    console.log("🚪 Pool cerrado correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al cerrar el pool:", error.stack);
    process.exit(1);
  }
});

export { pool };
