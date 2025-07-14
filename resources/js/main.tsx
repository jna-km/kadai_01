import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import axios from 'axios'; // ← 追加

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
