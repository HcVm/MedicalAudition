import React, { useContext, useEffect, useState } from 'react';
import { 
    Box, Typography, Grid, Container, Paper, List, ListItem, ListItemText, Divider,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getPacientes, getAudiologos, getCitas, getUsuarios } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pacientesCount, setPacientesCount] = useState(0);
  const [audiologosCount, setAudiologosCount] = useState(0);
  const [citasCount, setCitasCount] = useState(0);
  const [usuariosCount, setUsuariosCount] = useState(0);

  const [citas, setCitas] = useState([]);
  const [audiologos, setAudiologos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientes = await getPacientes();
        const audiologosData = await getAudiologos();
        const citasData = await getCitas();
        const usuariosData = await getUsuarios();

        setPacientesCount(pacientes.length);
        setAudiologosCount(audiologosData.length);
        setCitasCount(citasData.length);
        setUsuariosCount(usuariosData.length);
        setAudiologos(audiologosData);
        setCitas(citasData);
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowCitas = () => setShowData('citas');
  const handleShowAudiologos = () => setShowData('audiologos');
  const handleShowUsuarios = () => setShowData('usuarios');
  const handleEditarUsuario = (usuarioId) => {
    navigate(`/perfil`, { state: { usuarioId } }); // Navegar a la página de edición de perfil
  };

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
            <Typography variant="h6">Mostrar Datos</Typography>
            <List>
              <ListItem button onClick={handleShowCitas}>
                <ListItemText primary="Citas" />
              </ListItem>
              <ListItem button onClick={handleShowAudiologos}>
                <ListItemText primary="Audiólogos" />
              </ListItem>
              <ListItem button onClick={handleShowUsuarios}>
                <ListItemText primary="Usuarios" />
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
        {/* Mostrar datos según la selección */}
      {showData === 'citas' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Audiólogo</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell>{cita.Paciente.nombre} {cita.Paciente.apellido}</TableCell>
                  <TableCell>{cita.Audiologo.nombre} {cita.Audiologo.apellido}</TableCell>
                  <TableCell>{moment(cita.fecha).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>{cita.estado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {showData === 'audiologos' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Teléfono</TableCell>
                {/* Agrega más columnas según tus necesidades */}
              </TableRow>
            </TableHead>
            <TableBody>
              {audiologos.map((audiologo) => (
                <TableRow key={audiologo.id}>
                  <TableCell>{audiologo.nombre}</TableCell>
                  <TableCell>{audiologo.apellido}</TableCell>
                  <TableCell>{audiologo.especialidad}</TableCell>
                  <TableCell>{audiologo.email}</TableCell>
                  <TableCell>{audiologo.telefono}</TableCell>
                  {/* Agrega más celdas según tus necesidades */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {showData === 'usuarios' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre de Usuario</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell onClick={() => handleEditarUsuario(usuario.id)} style={{ cursor: 'pointer' }}>
                    {usuario.nombre_usuario}
                  </TableCell>
                  <TableCell>{usuario.rol}</TableCell>
                  {/* Agrega más celdas según tus necesidades */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </Box>
    </Container>
  );
}

export default AdminDashboard;
