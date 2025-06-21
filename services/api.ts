import axios from "axios";

const API = axios.create({ baseURL: "http://<your-local-ip>:5000/api" });

export const fetchSpotsNearby = (lat: any, lng: any) =>
  API.get(`/spots?lat=${lat}&lng=${lng}`);
export const createSpot = (data: any) => API.post("/spots", data);
