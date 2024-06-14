import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { Box, Typography, Button, FormControlLabel, Checkbox, FormGroup, TextField, Alert } from '@mui/material';
import dayjs from 'dayjs';
import { useAuth } from '../context/AuthContext';

const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function DisponibilidadCalendario({ horario, onHorarioChange }) {
  const { user, updateAudiologo } = useAuth();

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedHoras, setSelectedHoras] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const horasIniciales = {};
    horario.forEach(franja => {
      const fecha = dayjs(franja.fecha);
      const dia = fecha.format('dddd').toLowerCase();
      horasIniciales[dia] = horasIniciales[dia] || [];
      horasIniciales[dia].push(dayjs(franja.hora, 'HH:mm'));
    });
    setSelectedHoras(horasIniciales);
  }, [horario]);

  const handleDateChange = (date) => {
    if (date.isBefore(dayjs(), 'day')) {
      setError('No puedes seleccionar una fecha pasada.');
      return;
    }
    setError(null);
    setSelectedDate(date);
  };

  const handleDiaChange = (event, fecha) => {
    const dia = fecha.format('dddd').toLowerCase();
    setSelectedHoras((prevHoras) => ({
      ...prevHoras,
      [dia]: event.target.checked ? Array.from({ length: 24 }, (_, i) => dayjs().hour(i).minute(0)) : [],
    }));
  };

  const handleHoraChange = (dia, hora) => {
    setSelectedHoras((prevHoras) => {
      const horasDia = prevHoras[dia] || [];
      const index = horasDia.findIndex((h) => h.isSame(hora));
      if (index > -1) {
        horasDia.splice(index, 1);
      } else {
        horasDia.push(hora);
      }
      return { ...prevHoras, [dia]: horasDia };
    });
  };

  const handleGuardarHorario = async () => {
    const nuevoHorario = Object.entries(selectedHoras)
      .filter(([dia, horas]) => horas.length > 0)
      .flatMap(([dia, horas]) =>
        horas.map((hora) => ({ fecha: dayjs().day(diasSemana.indexOf(dia)).format('YYYY-MM-DD'), hora: hora.format('HH:mm') }))
      );

    if (nuevoHorario.length === 0) {
      setError('Debes seleccionar al menos una hora para cada día habilitado');
      return;
    }

    try {
      await updateAudiologo(user.audiologo.id, nuevoHorario);
      onHorarioChange(nuevoHorario);
      setError(null);
    } catch (error) {
      console.error('Error al actualizar el horario del audiólogo:', error);
      setError(error.response?.data?.error || 'Error al actualizar el horario');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="portrait"
        openTo="day"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        renderDay={(day, _value, DayComponentProps) => {
          const isDisabled = day.isBefore(dayjs(), 'day');
          const isSelected = day.isSame(selectedDate, 'day');
          const diaSemana = day.format('dddd').toLowerCase();
          const isAvailable = !isDisabled && selectedHoras[diaSemana] && selectedHoras[diaSemana].length > 0;
          return (
            <PickersDay
              {...DayComponentProps}
              disabled={isDisabled}
              sx={{
                bgcolor: isSelected ? 'lightblue' : isAvailable ? 'lightgreen' : 'lightgray',
              }}
            />
          );
        }}
      />

      <Box mt={2}>
        <Typography variant="h6">Horas disponibles:</Typography>
        {selectedDate && (
          <FormGroup row>
            {Array.from({ length: 24 }, (_, i) => i).map((hora) => {
              const horaFormateada = `${hora.toString().padStart(2, '0')}:00`;
              const isSelected = selectedHoras[selectedDate.format('dddd').toLowerCase()]?.some(
                (h) => h.format('HH:mm') === horaFormateada
              );
              return (
                <FormControlLabel
                  key={horaFormateada}
                  control={
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleHoraChange(selectedDate.format('dddd').toLowerCase(), dayjs(horaFormateada, 'HH:mm'))}
                    />
                  }
                  label={horaFormateada}
                  sx={{ mr: 1 }}
                />
              );
            })}
          </FormGroup>
        )}
      </Box>

      {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
      <Button variant="contained" onClick={handleGuardarHorario}>
        Guardar Horario
      </Button>
    </LocalizationProvider>
  );
}

export default DisponibilidadCalendario;
