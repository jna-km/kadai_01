/// <reference types="vite/client" />

import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/app.css';
import { useAuthStore } from './stores/authStore';
import { Toaster } from 'sonner';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const checkLoginStatus = useAuthStore.getState().checkLoginStatus;

const App: React.FC = () => {
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true }}
      />
    </>
  );
};

export default App;
