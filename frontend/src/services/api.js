import axios from "axios";

const api = axios.create({
 baseURL: "http://54.163.23.45:5000/api",
});

export default api;