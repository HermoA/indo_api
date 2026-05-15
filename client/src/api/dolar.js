import axios from "axios";

export const getDolar = async () => {
  try {
    const response = await axios.get(
      "https://bo.dolarapi.com/v1/dolares"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dollar data:", error);
    throw error;
  }
}