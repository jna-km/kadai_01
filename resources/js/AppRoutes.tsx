// AppRoutes.tsx
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/user/Login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
