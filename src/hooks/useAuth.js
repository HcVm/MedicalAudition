import { useState, useEffect, createContext, useContext } from 'react';
import { loginUsuario } from '../services/apiService';
import { jwtDecode } from 'jwt-decode'; 


const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {} 
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
      throw error; 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
