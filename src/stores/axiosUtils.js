import axios from "axios";

const api = axios.create({
 baseURL: "http://eventie.eastus.cloudapp.azure.com:5000",
});

export default api;