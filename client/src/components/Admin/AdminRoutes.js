import React from "react";
import {Navigate, Outlet} from "react-router-dom"
import getRoleFromToken from '../../utils/getRoleFromToken.js'

const AdminRoutes = () => {
  const role = getRoleFromToken();
  
  return role === 'admin' ? <Outlet /> : <Navigate to="/" /> ;
};

export default AdminRoutes
