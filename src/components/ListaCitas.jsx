import React, { useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { cancelarCita } from '../services/apiService';
import moment from 'moment';
import AuthContext from '../context/AuthContext';

function ListaCitas({ onCancelarCita }) {
  const { user } = useContext(AuthContext);
  const citas = user?.rol === 'paciente' ? user.citas : [];

  const handleCancelarCita = async (citaId) => {
    try {
      await cancelarCita(citaId);
      onCancelarCita(citaId);
    } catch (error) {
      console.error('Error al cancelar la cita:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {user.rol !== 'paciente' && <TableCell>Paciente</TableCell>} 
            <TableCell>Audiólogo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {citas.map((cita) => (
            <TableRow key={cita.id}>
              {user.rol !== 'paciente' && <TableCell>{cita.Paciente.nombre} {cita.Paciente.apellido}</TableCell>}
              <TableCell>{cita.Audiologo.nombre} {cita.Audiologo.apellido}</TableCell>
              <TableCell>{moment(cita.fecha).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{cita.hora}</TableCell>
              <TableCell>{cita.estado}</TableCell>
              <TableCell>
                {user.rol === 'paciente' && cita.estado === 'pendiente' && (
                  <Button variant="outlined" color="error" onClick={() => handleCancelarCita(cita.id)}>
                    Cancelar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListaCitas;
