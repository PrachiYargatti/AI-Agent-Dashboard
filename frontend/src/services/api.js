import axios from "axios";

const api = axios.create({

  baseURL:
    "https://ai-agent-dashboard-api-ghad.onrender.com",
});

export default api;