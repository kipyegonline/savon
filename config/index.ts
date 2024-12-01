import axios from "axios";

export enum Category {
  User = "user",
  Album = "album",
  Photos = "photos",
}

export const BASE_URL = "https://savon.finwit.co/api";

export const useApi = async (payload: string | Request) => {
  try {
    const response = await fetch(payload);
    if (response.ok) return await response.json();
    else throw new Error("Something went wrong");
  } catch (error) {
    if (error instanceof Error) return null;
    return null;
  }
};
export const submitPayload = async (
  url: string,
  payload: Record<string, string>
) => {
  try {
    const response = await axios.post(url, payload);
    console.log(response);
    return response.data;
  } catch (error) {
    if (error instanceof Error) return null;
    else return null;
  }
};
