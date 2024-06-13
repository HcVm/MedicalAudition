import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getCitaById } from '../services/apiService';
import { CircularProgress, Box, Typography, Alert } from '@mui/material';
import moment from 'moment';
import { Button } from '@mui/material';


function ConfirmacionCita() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [cita, setCita] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchCita = async () => {
      try {
        const data = await getCitaById(id);
        setCita(data);
      } catch (error) {
        console.error('Error al obtener los datos de la cita:', error);
        setErrorMessage(error.response.data.error || 'Error al cargar la cita');
      } finally {
        setIsLoading(false);
      }
    };

    // Si se proporciona la cita en el estado de la ubicación, úsala
    if (location.state?.cita) {
      setCita(location.state.cita);
      setIsLoading(false);
    } else if (id) { // Si no, intenta obtenerla por ID
      fetchCita();
    }
  }, [id, location.state?.cita]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  if (!cita) {
    return <Typography variant="h6">Cita no encontrada</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Cita Confirmada
      </Typography>
      <Box>
        <Typography variant="body1">
          Paciente: {cita.Paciente.nombre} {cita.Paciente.apellido}
        </Typography>
        <Typography variant="body1">
          Audiólogo: {cita.Audiologo.nombre} {cita.Audiologo.apellido}
        </Typography>
        <Typography variant="body1">
          Fecha y Hora: {moment(cita.fecha).format('DD/MM/YYYY')} - {cita.hora}
        </Typography>
        {/* Puedes agregar más detalles de la cita aquí */}
      </Box>
      {/* Agrega un botón para volver a la página anterior */}
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Volver
      </Button>
    </Box>
  );
}

export default ConfirmacionCita;
