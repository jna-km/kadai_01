import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // app.tsx を読み込む

import 'react-datepicker/dist/react-datepicker.css'; // ← react-datepickerのCSSを先にインポート
import '../css/app.css';                             // ← あなたのカスタムCSSを後にインポート


// DOMの #root に React アプリをマウント
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
