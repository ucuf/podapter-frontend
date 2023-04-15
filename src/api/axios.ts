import axios, { AxiosInstance } from "axios";

const baseURL = "http://localhost:8080";

export default axios.create({
  baseURL,
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
