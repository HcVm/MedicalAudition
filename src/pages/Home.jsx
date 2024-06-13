import React from 'react';
import { Box, Typography, Button, Grid, Container, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/hero.jpeg'; // Reemplaza con la ruta de tu imagen de fondo
import Service1Image from '../assets/service1.jpeg';
import Service2Image from '../assets/service2.jpg';
import Service3Image from '../assets/service3.jpg';

function Home() {
  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" component="h1" color="white" align="center" sx={{ fontWeight: 'bold' }}>
          Clínica Auditiva
        </Typography>
      </Box>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Nuestros Servicios
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: 'Evaluación Auditiva', description: 'Evaluaciones completas y precisas de tu audición.', image: Service1Image },
            { title: 'Adaptación de Audífonos', description: 'Encuentra los audífonos perfectos para tus necesidades.', image: Service2Image },
            { title: 'Terapia Auditiva', description: 'Terapias personalizadas para mejorar tu audición.', image: Service3Image },
          ].map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.title}>
              <Card>
                <CardMedia component="img" height="140" image={service.image} alt={service.title} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sección de Testimonios (en una futura iteración se agregará  testimonios aquí) */}
      {/* ... */}

      {/* Sección de Contacto (en una futura iteración se agregará información de contacto aquí) */}
      {/* ... */}

      <Container maxWidth="sm" sx={{ my: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" component={Link} to="/solicitud-cita">
              Solicitar Cita
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" component={Link} to="/login">
              Iniciar Sesión
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
