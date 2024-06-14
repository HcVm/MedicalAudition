import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getAudiologos } from '../services/apiService';

function CitaForm({ onSubmit, isLoading }) {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [audiologoId, setAudiologoId] = useState('');
  const [fechaHora, setFechaHora] = useState(null);
  const [audiologos, setAudiologos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAudiologos = async () => {
      try {
        const data = await getAudiologos();
        setAudiologos(data);
      } catch (error) {
        console.error('Error al obtener audiólogos:', error);
        setError('No se pueden cargar los audiólogos en este momento');
      }
    };
    fetchAudiologos();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (dni.length !== 8 || !/^\d+$/.test(dni)) {
      toast.error('El DNI debe tener 8 dígitos numéricos.');
      return;
    }

    onSubmit({ dni, nombre, apellido, email, telefono }, audiologoId, fechaHora);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        type="email"
      />
      <TextField
        fullWidth
        label="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="audiologo-select-label">Audiólogo</InputLabel>
        <Select
          labelId="audiologo-select-label"
          id="audiologo-select"
          value={audiologoId}
          label="Audiólogo"
          onChange={(e) => setAudiologoId(e.target.value)}
        >
          {audiologos.length > 0 ? (
            audiologos.map((audiologo) => (
              <MenuItem key={audiologo.id} value={audiologo.id}>
                {audiologo.nombre} {audiologo.apellido}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>Cargando audiólogos...</MenuItem>
          )}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Fecha y Hora"
          value={fechaHora}
          onChange={(newValue) => setFechaHora(newValue)}
          renderInput={(params) => <TextField {...params} margin="normal" />}
        />
      </LocalizationProvider>
      <Button type="submit" variant="contained" disabled={isLoading} margin="normal">
        {isLoading ? 'Solicitando...' : 'Solicitar Cita'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default CitaForm;
