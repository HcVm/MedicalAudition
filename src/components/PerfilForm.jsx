import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { crearUsuario, getUsuarioById, actualizarUsuario } from '../services/apiService';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';


function PerfilForm({ usuarioId, onSubmit, onCancel }) {
  const [isEditing, setIsEditing] = useState(!!usuarioId);
  const { user, updateUser } = useContext(AuthContext);
  const [nombreUsuario, setNombreUsuario] = useState(user?.nombre_usuario || '');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState(user?.rol || 'audiólogo');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (usuarioId && !user) {
      const fetchUsuario = async () => {
        try {
          const usuario = await getUsuarioById(usuarioId);
          setNombreUsuario(usuario.nombre_usuario);
          setRol(usuario.rol);
        } catch (error) {
          setError(error.response.data.error || 'Error al obtener los datos del usuario');
        }
      };
      fetchUsuario();
    }
  }, [usuarioId, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const datosUsuario = { nombre_usuario: nombreUsuario.trim(), rol };

      if (!isEditing || contraseña) {
        if (!contraseña) {
          throw new Error('La contraseña es obligatoria');
        } else if (contraseña.length < 8) {
          throw new Error('La contraseña debe tener al menos 8 caracteres');
        }
        datosUsuario.contraseña = contraseña;
      }

      const response = isEditing
        ? await actualizarUsuario(usuarioId, datosUsuario)
        : await crearUsuario(datosUsuario);

      updateUser(response);
      onSubmit();
  toast.success('Perfil actualizado correctamente');
} catch (error) {
  console.error('Error al crear/actualizar usuario:', error);
  toast.error(error.message || 'Error al crear/actualizar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Nombre de usuario"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        margin="normal"
        required
        disabled={isLoading}
      />
      {!isEditing && (
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          margin="normal"
          required
          disabled={isLoading}
        />
      )}
      <FormControl fullWidth margin="normal">
        <InputLabel id="rol-select-label">Rol</InputLabel>
        <Select
          labelId="rol-select-label"
          id="rol-select"
          value={rol}
          label="Rol"
          onChange={(e) => setRol(e.target.value)}
          disabled={isLoading}
        >
          <MenuItem value="audiólogo">Audiólogo</MenuItem>
          <MenuItem value="administrador">Administrador</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isEditing ? 'Actualizar Perfil' : 'Crear Perfil'}
      </Button>
      {onCancel && (
        <Button variant="outlined" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        
      )}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </form>
  );
}

export default PerfilForm;
