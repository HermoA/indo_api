import { pool } from "../db.js";

//-----------------Recivir datos --------------------//
export const getCanciones = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM canciones ORDER BY id_cancione DESC"
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};

//-----------------Recivir un dato --------------------//
export const getCancion = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM canciones WHERE id_cancione = ?",
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
//-----------------canciones sin ranking --------------------//
export const getCancionesSinRanking = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM canciones WHERE id_ranking IS NULL ORDER BY id_cancione DESC"
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos" });
  }
};

//-----------------Crear datos --------------------//
export const postCancion = async (req, res) => {
  try {
    const { link, titulo, artista } = req.body;
    const [result] = await pool.query(
      "INSERT INTO canciones (link, titulo, artista) VALUES (?, ?, ?)",
      [link, titulo, artista]
    );

    res.json({
      message: "canción creada correctamente",
      id_cancione: result.insertId,
      link,
      titulo,
      artista,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el dato" });
  }
};

//-----------------Actualizar datos --------------------//
export const putCancion = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE canciones SET ? WHERE id_cancione = ?",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el dato" });
  }
};

//-----------------Eliminar datos --------------------//
export const deleteCancion = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM canciones WHERE id_cancione = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "dato no encontrado" });
    }

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el dato" });
  }
};
//-----------------Buscar canciones --------------------//
export const searchCanciones = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar un término de búsqueda" });
    }

    const [result] = await pool.query(
      `SELECT * FROM canciones 
       WHERE titulo LIKE ? OR artista LIKE ? 
       ORDER BY id_cancione DESC`,
      [`%${query}%`, `%${query}%`]
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar canciones" });
  }
};
