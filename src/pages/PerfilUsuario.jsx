import { useState, useContext } from "react";
import PerfilForm from '../components/PerfilForm';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';


function PerfilUsuario() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [mensajeExito, setMensajeExito] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);

  const handlePerfilSubmit = (nuevosDatosUsuario) => { // Recibir los nuevos datos del usuario
    try {
      updateUser(nuevosDatosUsuario); // Actualizar el contexto con los nuevos datos
      setMensajeExito('Perfil actualizado correctamente');
      setMensajeError(null);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setMensajeExito(null);
      setMensajeError(error.response.data.error || 'Error al actualizar el perfil');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Mi Perfil</Typography>
      {mensajeExito && <Alert severity="success" onClose={() => setMensajeExito(null)}>{mensajeExito}</Alert>}
      {mensajeError && <Alert severity="error" onClose={() => setMensajeError(null)}>{mensajeError}</Alert>}
      <PerfilForm usuarioId={user.id} onSubmit={handlePerfilSubmit} onCancel={handleLogout} />
    </Box>
  );
}

export default PerfilUsuario;

