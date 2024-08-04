const env = "dev";
const API_BASE_URL =
  env !== "dev" ? "http://localhost:8001" : "http://localhost:8000";

export default API_BASE_URL;
