import React, { createContext, useState, useEffect } from 'react';
import { loginUsuario } from '../services/apiService';
import { jwtDecode } from 'jwt-decode'; 


const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (nombre_usuario, contraseña) => {
    try {
      const { token } = await loginUsuario(nombre_usuario, contraseña);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      localStorage.setItem('user', JSON.stringify(decodedToken));
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthContext; 