import React, { useState, useEffect, useContext } from 'react';
import ListaCitas from '../components/ListaCitas';
import { obtenerCitasPaciente, getCitas, cancelarCita } from '../services/apiService';
import {useAuth} from '../hooks/useAuth';
import { Typography, CircularProgress, Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

function MisCitas() {
  const { user, isAuthenticated } = useAuth();
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dniBusqueda, setDniBusqueda] = useState('');

  useEffect(() => {
    const fetchCitas = async () => {
      if (isAuthenticated && user.rol === 'audiólogo') {
        setIsLoading(true);
        try {
          const data = await getCitas(); 
          setCitas(data);
        } catch (err) {
          console.error('Error al obtener las citas:', err);
          setError(err.response.data.error || 'Error al cargar las citas');
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchCitas();
  }, [user, isAuthenticated]);

  const handleBuscarCitas = async () => {
    setIsLoading(true);
    try {
      const data = await obtenerCitasPaciente(dniBusqueda);
      setCitas(data);
    } catch (err) {
      console.error('Error al obtener las citas:', err);
      setError(err.response.data.error || 'Error al cargar las citas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelarCita = async (citaId) => {
    setIsLoading(true);
    try {
      await cancelarCita(citaId);
      setCitas((prevCitas) => prevCitas.filter((cita) => cita.id !== citaId));
      toast.success('Cita cancelada con éxito', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error al cancelar la cita:', error);
      toast.error(error.response.data.error || 'Error al cancelar la cita');
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {user?.rol === 'audiólogo' ? 'Mis Citas' : 'Consultar Citas'}
      </Typography>

      {!isAuthenticated && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="DNI del Paciente"
            value={dniBusqueda}
            onChange={(e) => setDniBusqueda(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleBuscarCitas} disabled={isLoading}>
            Buscar
          </Button>
        </Box>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="h6" color="error">{error}</Typography>
      ) : (
        <ListaCitas citas={citas} onCancelarCita={handleCancelarCita} showPaciente={user?.rol !== 'paciente'} />
      )}
    </Box>
  );
}

export default MisCitas;

