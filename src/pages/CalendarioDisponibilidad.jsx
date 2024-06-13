import React, { useState, useEffect, useContext } from 'react';
import DisponibilidadCalendario from '../components/DisponibilidadCalendario';
import { actualizarHorarioAudiologo, getAudiologoById } from '../services/apiService';
import { CircularProgress, Box, Typography, Alert } from '@mui/material';
import AuthContext from '../context/AuthContext';

function CalendarioDisponibilidad() {
  const { user } = useContext(AuthContext);
  const audiologoId = user?.audiologo?.id; 

  const [horario, setHorario] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchHorario = async () => {
      if (!audiologoId) { // Si no hay audiólogo asociado, salir del useEffect
        setIsLoading(false);
        return; 
      }
      try {
        const audiologo = await getAudiologoById(audiologoId);
        setHorario(audiologo.horario_disponibilidad || []);
      } catch (error) {
        console.error('Error al obtener el horario del audiólogo:', error);
        setErrorMessage(error.response.data.error || 'Error al cargar el horario');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHorario();
  }, [audiologoId]); // Ejecutar solo cuando cambia el ID del audiólogo

  const handleHorarioChange = async (nuevoHorario) => {
    try {
      setIsLoading(true);
      await actualizarHorarioAudiologo(audiologoId, nuevoHorario);
      setSuccessMessage('Horario actualizado correctamente');
      setErrorMessage(null);
    } catch (error) {
      console.error('Error al actualizar el horario:', error);
      setErrorMessage(error.response.data.error || 'Error al actualizar el horario');
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
