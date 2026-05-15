import { pool } from "../db.js";

//-----------------Recivir datos --------------------//
export const getVotos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.title, c.artist, IFNULL(v.votos_can, 0) as votos 
       FROM canciones s 
       LEFT JOIN votos v ON s.id = v.id_cancione 
       ORDER BY votos DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el ranking" });
  }
};

//-----------------Recivir un dato --------------------//
export const getVoto = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM votos WHERE id_votos = ?",
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

//-----------------Crear datos --------------------//
export const postVoto = async (req, res) => {
  try {
    const { id_cancione } = req.body;

    // Buscar si ya existe el registro de votos para esa canción
    const [rows] = await pool.query(
      "SELECT votos_can FROM votos WHERE id_cancione = ?",
      [id_cancione]
    );

    if (rows.length > 0) {
      // Ya existe, entonces actualizamos
      const votosActuales = rows[0].votos_can;
      const nuevosVotos = votosActuales + 1;

      await pool.query(
        "UPDATE votos SET votos_can = ? WHERE id_cancione = ?",
        [nuevosVotos, id_cancione]
      );

      res.json({
        message: "Voto actualizado",
        id_cancione,
        votos_can: nuevosVotos,
      });
    } else {
      // No existe, insertamos el primer voto
      await pool.query(
        "INSERT INTO votos (id_cancione, votos_can) VALUES (?, ?)",
        [id_cancione, 1]
      );

      res.json({
        message: "Voto registrado",
        id_cancione,
        votos_can: 1,
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el voto" });
  }
};

//-----------------Actualizar datos --------------------//
export const putVoto = async (req, res) => {
  try {
    const result = await pool.query("UPDATE votos SET ? WHERE id_votos = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el dato" });
  }
};

//-----------------Eliminar datos --------------------//
export const deleteVoto = async (req, res) => {
  try {
    const  id_cancione  = req.params.id;

    const [rows] = await pool.query(
      "SELECT votos_can FROM votos WHERE id_cancione = ?",
      [id_cancione]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "La canción no tiene votos registrados" });
    }

    const votosActuales = rows[0].votos_can;
    const nuevosVotos = votosActuales > 0 ? votosActuales - 1 : 0;

    await pool.query(
      "UPDATE votos SET votos_can = ? WHERE id_cancione = ?",
      [nuevosVotos, id_cancione]
    );

    res.json({
      message: "Voto eliminado",
      id_cancione,
      votos_can: nuevosVotos,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el voto" });
  }
};