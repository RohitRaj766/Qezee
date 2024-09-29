import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("User isAuthenticated:: ", isAuthenticated);

  if (isAuthenticated) {
    return <Outlet />; 
  }
  return <Navigate to="/login" />;
};

const AdminPrivateRoute = () => {
  const isAdminAuthenticated = useSelector((state) => state.adminauth.isAuthenticated);

  console.log("Admin isAuthenticated:: ", isAdminAuthenticated);

  if (isAdminAuthenticated) {
    return <Outlet />; 
  }
  return <Navigate to="/admin/login" />;
};

export { PrivateRoute, AdminPrivateRoute };

