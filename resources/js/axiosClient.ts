import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export function setOperatorToken(token: string | null) {
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
}

// ここでリクエストやレスポンスのインターセプト設定も可能
axiosClient.interceptors.response.use(
  response => response,
  error => {
    // エラーログなど
    return Promise.reject(error);
  }
);

export default axiosClient;
