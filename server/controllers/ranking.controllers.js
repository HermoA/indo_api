import { pool } from "../db.js";

//-----------------Recivir datos --------------------//
export const getRankings = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM ranking");
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el ranking" });
  }
};

//-----------------Recivir nombre de ranking --------------------//
export const nombreRanking = async (req, res) => {
  try {
    const [nameranking] = await pool.query(
      "SELECT nombre, id_ranking, descripcion FROM ranking WHERE id_ranking = (SELECT MAX(id_ranking) FROM ranking)"
    );
    if (nameranking.length === 0) {
      return res.status(404).json({ message: "ranking no encontrado" });
    }

    res.json(nameranking[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el Nombre de Ranking" });
  }
};
//-----------------Recivir canciones de ranking --------------------//
export const cancionesRanking = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT c.id_cancione, c.titulo, c.artista, c.link, v.votos_can AS votos FROM canciones AS c LEFT JOIN votos AS v ON c.id_cancione = v.id_cancione WHERE c.id_ranking = (SELECT MAX(id_ranking) FROM ranking) ORDER BY v.votos_can DESC LIMIT 20"
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "canciones no encontradas" });
    }

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las canciones del Ranking" });
  }
};
//-----------------Crear datos --------------------//
export const postRanking = async (req, res) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO ranking (nombre, descripcion) VALUES (?, ?)",
      [req.body.nombre, req.body.descripcion]
    );
    res.json({
      id: result.insertId,
      nombre: req.body.nombre,
      desdescripcion: req.body.desdescripcion,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el ranking" });
  }
};

//-----------------Actualizar datos --------------------//
export const putRanking = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE ranking SET ? WHERE id_ranking = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el ranking" });
  }
};

//-----------------Eliminar datos --------------------//
export const deleteRanking = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM ranking WHERE id_ranking = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ranking no encontrada" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el ranking" });
  }
};
