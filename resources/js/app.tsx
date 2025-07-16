import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import OperatorLogin from './pages/OperatorLogin';
import AdminDashboard from './pages/AdminDashboard';
import Logout from './pages/Logout';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Reservations from './pages/Reservations';
import ReservationCreate from './pages/ReservationCreate';
import ReservationEdit from './pages/ReservationEdit';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CreateReservation from './pages/CreateReservation'; // 追加
import axios from 'axios'; // ← 追加
import 'react-datepicker/dist/react-datepicker.css'; // ← react-datepickerのCSSを先にインポート
import '../css/app.css';                             // ← あなたのカスタムCSSを後にインポート


axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/operator/login" element={<OperatorLogin />} />
          <Route path="/logout" element={<Logout />} />
          
          {/* User Dashboard and its sub-routes are protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="reservations/new" element={<ReservationCreate />} />
              <Route path="reservations/create" element={<CreateReservation />} /> {/* 新規作成ページへのルート追加 */}
              <Route path="reservations/edit/:reservationId" element={<ReservationEdit />} />
              {/* Add other dashboard routes here */}
            </Route>
          </Route>

          {/* Admin routes are also protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Add other admin routes here */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
