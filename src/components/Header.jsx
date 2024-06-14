import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <img src="logo.png" alt="Logo" style={{ height: 60, marginRight: 5 }} /> 
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Medical Audición
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <Button component={Link} to="/" color="inherit">
            Inicio
          </Button>

          {user ? (
            <>
              {user.rol === 'audiólogo' && (
                <Button component={Link} to="/calendario-disponibilidad" color="inherit">
                  Disponibilidad
                </Button>
              )}
              {user.rol === 'administrador' && (
                <>
                  <Button component={Link} to="/crear-perfil-medico" color="inherit">
                    Crear Perfil
                  </Button>
                  <Button component={Link} to="/gestion-inventario" color="inherit">
                    Inventario
                  </Button>
                </>
              )}
              <Button component={Link} to="/perfil" color="inherit">
                Perfil
              </Button>
              <Button color="inherit" onClick={logout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">
                Iniciar Sesión
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
