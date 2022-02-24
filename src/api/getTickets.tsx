import axios from "axios";

const baseURL = "http://localhost:8080";
export const getTicket = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
  // withCredentials: true,
});
