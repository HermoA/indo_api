import axios from "axios";


const getTrack = async (trackId, accessToken) => {
  const res = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

export default getTrack;
