import React, { useState, useEffect, useContext } from 'react';
import DisponibilidadCalendario from '../components/DisponibilidadCalendario';
import { getAudiologoById } from '../services/apiService';
import { CircularProgress, Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function CalendarioDisponibilidad() {
  const { user } = useAuth();
  const audiologoId = user?.audiologo?.id;

  const [horario, setHorario] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchHorario = async () => {
      if (!user || user.rol !== 'audiólogo' || !audiologoId) {
        setIsLoading(false);
        setErrorMessage('No tienes permiso para acceder a esta página o falta información de usuario.');
        return;
      }

      try {
        const data = await getAudiologoById(audiologoId);
        setHorario(data.horario_disponibilidad || []);
      } catch (error) {
        console.error('Error al obtener el horario del audiólogo:', error);
        setErrorMessage(error.response?.data?.error || 'Error al cargar el horario');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHorario();
  }, [audiologoId, user]);

  const handleHorarioChange = async (nuevoHorario) => {
    try {
      setIsLoading(true);
      // Actualiza el horario directamente en el estado local
      setHorario(nuevoHorario);
      setIsLoading(false);
      setSuccessMessage('Horario actualizado correctamente');
      setErrorMessage(null);
    } catch (error) {
      console.error('Error al actualizar el horario:', error);
      setErrorMessage(error.response?.data?.error || 'Error al actualizar el horario');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.rol !== 'audiólogo') {
    return <Typography variant="h6">No tienes permiso para acceder a esta página</Typography>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mi Disponibilidad
      </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <DisponibilidadCalendario 
        horario={horario} 
        onHorarioChange={handleHorarioChange} 
        isLoading={isLoading} 
      />
    </Box>
  );
}

export default CalendarioDisponibilidad;