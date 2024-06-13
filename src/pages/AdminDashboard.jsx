import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Grid, Container, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getPacientes, getAudiologos, getCitas } from '../services/apiService';


function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [pacientesCount, setPacientesCount] = useState(0);
  const [audiologosCount, setAudiologosCount] = useState(0);
  const [citasCount, setCitasCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientes = await getPacientes();
        const audiologos = await getAudiologos();
        const citas = await getCitas();

        setPacientesCount(pacientes.length);
        setAudiologosCount(audiologos.length);
        setCitasCount(citas.length);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard de Administración
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Resumen</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Pacientes" secondary={pacientesCount} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Audiólogos" secondary={audiologosCount} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Citas" secondary={citasCount} />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Acciones</Typography>
              <List>
                <ListItem button component={Link} to="/crear-perfil-medico">
                  <ListItemText primary="Crear Perfil Médico" />
                </ListItem>
                <ListItem button component={Link} to="/gestion-inventario">
                  <ListItemText primary="Gestionar Inventario" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default AdminDashboard;
