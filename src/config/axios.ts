import axios from "axios";

const publicAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

publicAxios.interceptors.response.use((response) => {
  // const { data } = response
  return response.data;
});

export default publicAxios;
