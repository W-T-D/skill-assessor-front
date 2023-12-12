import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CurrentUser from "../models/user/CurrentUser";

interface ProtectedRouteProps {
  children: React.ReactElement | React.ReactElement[] | string;
  redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath
}) => {
  const isAuthenticated: boolean = useSelector(
    (user: CurrentUser) => user.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
