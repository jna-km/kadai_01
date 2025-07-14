import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
// import OperatorLogin from './pages/OperatorLogin';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Reservations from './pages/Reservations';

// import OperatorDashboard from './pages/OperatorDashboard';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/operator/login" element={<OperatorLogin />} /> */}

        <Route path="/dashboard" element={<DashboardLayout />}>

 <Route index element={<DashboardHome />} />
 <Route path="reservations" element={<Reservations />} />
      </Route>

        {/* <Route path="/operator/dashboard" element={<OperatorDashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
