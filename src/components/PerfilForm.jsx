import React, { useState } from 'react';
import { TextField, Button, Grid, Alert } from '@mui/material';
import { toast } from 'react-toastify';
import { crearAudiologo } from '../services/apiService';

function PerfilForm({ onSubmit, onCancel }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (!nombre || !apellido || !email || !contraseña || !confirmarContraseña) {
        throw new Error('Todos los campos son obligatorios.');
      }
      if (contraseña !== confirmarContraseña) {
        throw new Error('Las contraseñas no coinciden');
      }

      const audiologoData = {
        nombre,
        apellido,
        especialidad,
        email,
        telefono,
        contraseña,
      };

      await crearAudiologo(audiologoData);
      toast.success('Audiólogo creado correctamente');
      onSubmit();
    } catch (error) {
      console.error('Error al crear audiólogo:', error.message);
      setError(error.message || 'Error al crear audiólogo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Campos para nombre, apellido, especialidad, email y teléfono */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            disabled={isLoading}
            error={!!error}
            helperText={error && error.includes('nombre') ? error : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            disabled={isLoading}
            error={!!error}
            helperText={error && error.includes('apellido') ? error : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Especialidad"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            required
            disabled={isLoading}
            error={!!error}
            helperText={error && error.includes('especialidad') ? error : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            error={!!error}
            helperText={error && error.includes('email') ? error : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            disabled={isLoading}
            error={!!error}
            helperText={error && error.includes('telefono') ? error : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            disabled={isLoading}
            error={!!error}
            helperText={error && error.includes('contraseña') ? error : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
            required
            disabled={isLoading}
            error={!!error}
            helperText={error && error.includes('contraseñas') ? error : ''}
          />
        </Grid>

        {/* Botones de acción */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            Crear Audiólogo
          </Button>
          {onCancel && (
            <Button onClick={onCancel} disabled={isLoading}>
              Cancelar
            </Button>
          )}
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default PerfilForm;
