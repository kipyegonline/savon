import axios, { AxiosError } from "axios";

export enum Category {
  User = "user",
  Album = "album",
  Photos = "photos",
}

export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api"
    : "https://savon.finwit.co/api";

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
let abort!: AbortController;
const time = 60 * 1000, // cancel request after one minute
  timeout: null | ReturnType<typeof setTimeout> = null;

export const submitPayload = async (
  url: string,
  payload: Record<string, string>
) => {
  abort = new AbortController();
  if (timeout) clearTimeout(timeout);
  let responded = false;

  try {
    setTimeout(() => {
      if (!responded) abort.abort();
    }, time);
    const response = await axios.post(url, payload, { signal: abort.signal });
    responded = true;

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else return { message: error as AxiosError };
  }
};
