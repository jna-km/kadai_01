import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/app.css';
import { useAuthStore } from './stores/authStore';
import Notification from '@/components/ui/Notification';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const App: React.FC = () => {
  const checkLoginStatus = useAuthStore(state => state.checkLoginStatus);
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <>
      <Notification />
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      />
    </>
  );
};

export default App;
