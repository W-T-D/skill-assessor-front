import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from "../components/ui/Loader";
import {useAuth} from "../services/providers/auth/AuthProvider";
import LoginPage from "../components/containers/LoginPage";

const AppRoutes: React.FC = () => {
  const { isLoading } = useAuth();

  return (
    <Loader isLoading={isLoading}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Loader>
  );
};

export default AppRoutes;
