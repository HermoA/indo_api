import dotenv from "dotenv";
import { createPool } from "mysql2/promise";

dotenv.config();

const config = {
  host: process.env.HOST,
  port: process.env.PORTDB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export const pool =  createPool(config);

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Conectado a MySQL correctamente");
    conn.release();
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error.message);
  }
})();

