import axios from "axios";

export const fetchPayload = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
};

export async function updatePhoto(editUrl: string, payload: { title: string }) {
  try {
    const response = await axios.put(editUrl, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
}
