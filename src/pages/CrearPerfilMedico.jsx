import React, { useState, useContext } from 'react';
import PerfilForm from '../components/PerfilForm';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Alert } from '@mui/material';


function CrearPerfilMedico() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mensajeExito, setMensajeExito] = useState(null);
  const [mensajeError, setMensajeError] = useState(null);

  const handleSubmit = async () => {
    try {
      setMensajeExito('Perfil creado exitosamente');
      setMensajeError(null);
      navigate('/login');
    } catch (error) {
      console.error('Error al crear perfil:', error);
      setMensajeExito(null);
      setMensajeError(error.response.data.error || 'Error al crear perfil');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Crear Perfil Médico</h1>
      {mensajeExito && <Alert severity="success" onClose={() => setMensajeExito(null)}>{mensajeExito}</Alert>}
      {mensajeError && <Alert severity="error" onClose={() => setMensajeError(null)}>{mensajeError}</Alert>}
      <PerfilForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default CrearPerfilMedico;
