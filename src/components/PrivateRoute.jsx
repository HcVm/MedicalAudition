import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);

  return user && allowedRoles.includes(user.rol) ? (
    <Outlet /> // Renderiza el componente hijo de la ruta si el usuario está autenticado y tiene el rol permitido
  ) : (
    <Navigate to="/login" replace /> // Redirige al login si no está autenticado o no tiene el rol permitido
  );
};

export default PrivateRoute;
