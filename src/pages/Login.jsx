import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Limpiar mensajes de error anteriores

    try {
      const user = await login(nombreUsuario, contraseña); // Obtener datos del usuario autenticado

      // Redirigir según el rol del usuario
      if (user.rol === 'paciente') {
        navigate('/mis-citas'); 
      } else if (user.rol === 'audiólogo') {
        navigate('/calendario-disponibilidad'); 
      } else if (user.rol === 'administrador') {
        // Aquí puedes redirigir a una página de administración o a la que consideres adecuada
        navigate('/admin-dashboard'); // Ejemplo de redirección a un dashboard de administrador
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error al iniciar sesión'); // Mostrar mensaje de error
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>

      {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Iniciar Sesión
        </Button>
      </form>
    </Box>
  );
}

export default Login;
