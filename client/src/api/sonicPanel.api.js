import axios from "axios";

// ─── URL base de iTunes con CORS habilitado ───────────────────────────────────

export const getRadioInfo = async () => {
  try {
    const response = await axios.get(
      "https://live.turadiotv.com/cp/get_info.php?p=8160",
    );
    return response.data;
  } catch {
    return null;
  }
};

export const getArtItunes = async (title) => {
  if (!title?.trim()) return null;

  try {
    const query = encodeURIComponent(title.trim());
    const response = await fetch(
      `https://api.indoamericalaradio.com/itunes/artwork?term=${query}`,
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.artwork ?? null;
  } catch {
    return null;
  }
};
