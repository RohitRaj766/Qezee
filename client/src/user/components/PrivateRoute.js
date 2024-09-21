import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("User isAuthenticated:: ", isAuthenticated);

  if (isAuthenticated) {
    return <Outlet />; // Render the protected route for regular users
  }

  // If user is not authenticated, redirect to user login page
  return <Navigate to="/login" />;
};

const AdminPrivateRoute = () => {
  const isAdminAuthenticated = useSelector((state) => state.adminauth.isAuthenticated);

  console.log("Admin isAuthenticated:: ", isAdminAuthenticated);

  if (isAdminAuthenticated) {
    return <Outlet />; // Render the protected route for admins
  }

  // If admin is not authenticated, redirect to admin login page
  return <Navigate to="/admin/login" />;
};

export { PrivateRoute, AdminPrivateRoute };

