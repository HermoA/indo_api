export const getItunesArtwork = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term?.trim()) {
      return res.status(400).json({ message: "Debe proporcionar un término de búsqueda" });
    }

    const query = encodeURIComponent(term.trim());
    const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1&media=music`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results?.length) {
      return res.json({ artwork: null });
    }

    const result = data.results[0];

    // iTunes no siempre devuelve artworkUrl600, se construye desde artworkUrl100
    const artwork = result.artworkUrl100
      ? result.artworkUrl100.replace("100x100bb", "600x600bb")
      : null;

    res.json({ artwork });

  } catch {
    res.status(500).json({ message: "Error al obtener la portada" });
  }
};