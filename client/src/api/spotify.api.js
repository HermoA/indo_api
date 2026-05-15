import axios from "axios";

const clientId = "467fef7d45ff4852ac441c22341356c0";
const clientSecret = "0d85193ae70d4bcd8657561f6f27c048";

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(clientId + ":" + clientSecret),
      },
    }
  );

  return response.data.access_token;
};

export default getAccessToken;