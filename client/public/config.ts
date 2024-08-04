const env = "prod";
const API_BASE_URL =
  env === "prod" ? "http://168.119.122.154:8000" : "http://localhost:8000";

export default API_BASE_URL;
