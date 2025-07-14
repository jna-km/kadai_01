// resources/js/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import Dashboard from './pages/Dashboard';
import UserDashboardPage from './pages/UserDashboardPage';
import OperatorDashboardPage from './pages/OperatorDashboardPage';

const Top = () => <div>ようこそ！トップページです</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
  {
    path: '/users',
    element: <UserListPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },

// ルート一覧の中に以下を追加
{
  path: '/user/dashboard',
  element: <UserDashboardPage />,
},
{
  path: '/operator/dashboard',
  element: <OperatorDashboardPage />,
},
]);

export default router;
