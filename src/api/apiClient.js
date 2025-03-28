const { axios } = require("axios");

const api = axios.create({
  baseURL:"http://127.0.0.1:7000/",
  timeout: 1000,
  headers: {'Content-type': 'Application/json'}
});

export default api;