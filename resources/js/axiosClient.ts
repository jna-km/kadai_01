import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:88", // nginxのサービス名（Docker Composeのservice名）
  withCredentials: true, // CSRF Cookieやセッション維持に必要
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// ここでリクエストやレスポンスのインターセプト設定も可能
axiosClient.interceptors.response.use(
  response => response,
  error => {
    // エラーログなど
    return Promise.reject(error);
  }
);

export default axiosClient;
