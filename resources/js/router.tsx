import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';

// パブリックページ
import Home from './pages/Home';
import Login from './pages/user/Login';
import OperatorLogin from './pages/operator/OperatorLogin';
import Logout from './pages/Logout';
import AdminDashboard from './pages/AdminDashboard';

// ユーザーダッシュボード
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/user/DashboardHome';
import Reservations from './pages/user/Reservations';
import ReservationCreate from './pages/user/ReservationCreate';
import ReservationEdit from './pages/user/ReservationEdit';

// オペレーター管理ページ
import OperatorDashboard from './pages/operator/OperatorDashboard';
import OperatorReservationsPage from './pages/operator/OperatorReservationsPage';
import OperatorUsersPage from './pages/operator/OperatorUsersPage';
import OperatorServicesPage from './pages/operator/OperatorServicesPage';
import OperatorHolidaysPage from './pages/operator/OperatorHolidaysPage';
import OperatorNoticesPage from './pages/operator/OperatorNoticesPage';

import OperatorListPage from './pages/OperatorListPage';
import OperatorDetailPage from './pages/OperatorDetailPage';

import TestApi from './test/TestApi';

const router = createBrowserRouter([
  // パブリックルート
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/operator/login', element: <OperatorLogin /> },
  { path: '/logout', element: <Logout /> },
  { path: '/admin/dashboard', element: <AdminDashboard /> },

  { path: '/test-api', element: <TestApi /> },

  { path: '/operators', element: <OperatorListPage /> },
  { path: '/operators/:id', element: <OperatorDetailPage /> },

  // ユーザー用ダッシュボード（認証必須）
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: 'reservations', element: <Reservations /> },
          { path: 'reservations/create', element: <ReservationCreate /> },
          { path: 'reservations/edit/:reservationId', element: <ReservationEdit /> },
        ]
      }
    ]
  },

  // オペレーター用ダッシュボード（認証必須）
  {
    path: '/operator',
    element: <ProtectedRoute />,
    children: [
      { path: 'dashboard', element: <OperatorDashboard /> },
      { path: 'reservations', element: <OperatorReservationsPage /> },
      { path: 'users', element: <OperatorUsersPage /> },
      { path: 'services', element: <OperatorServicesPage /> },
      { path: 'holidays', element: <OperatorHolidaysPage /> },
      { path: 'notices', element: <OperatorNoticesPage /> },
    ]
  }
]);

export default router;
