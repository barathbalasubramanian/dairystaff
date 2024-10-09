import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './UseAuth';

const PrivateRoute = async () => {
  console.log("fgchjkl");
  await useAuth();
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
