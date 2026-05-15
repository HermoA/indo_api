import axios from 'axios';

export const getRadioInfo = async () => {
  try {
    const response = await axios.get('https://live.turadiotv.com/cp/get_info.php?p=8160');
    const data = response.data;

    const currentTitle = data.title;
    const currentCover = data.art;

    // Recuperar historial del localStorage
    const storedHistory = JSON.parse(localStorage.getItem('songHistory')) || [];

    const isAlreadyStored = storedHistory.some(song => song.title === currentTitle);

    let updatedHistory = storedHistory;
    if (!isAlreadyStored) {
      updatedHistory = [{ title: currentTitle, cover: currentCover }, ...storedHistory].slice(0, 3);
      localStorage.setItem('songHistory', JSON.stringify(updatedHistory));
    }

    return { currentSong: { title: currentTitle, cover: currentCover }, songHistory: updatedHistory };
  } catch (error) {
    console.error('Error al obtener datos de la radio:', error);
    return null;
  }
};