import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo (ajusta la ruta y el estilo según tus necesidades) */}
        <img src="/logo.png" alt="Logo" style={{ height: 40, marginRight: 10 }} /> 

        {/* Título */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Clínica Auditiva
        </Typography>

        {/* Botones de Navegación */}
        <Box sx={{ display: 'flex' }}> {/* Agrupar botones en un Box */}
          <Button component={Link} to="/" color="inherit">
            Inicio
          </Button>

          {user ? ( // Mostrar botones según el rol del usuario
            <>
              {user.rol === 'paciente' && (
                <Button component={Link} to="/mis-citas" color="inherit">
                  Mis Citas
                </Button>
              )}
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
                  {/* Agrega más botones para otras funcionalidades de administrador */}
                </>
              )}
              <Button component={Link} to="/perfil" color="inherit">
                Perfil
              </Button>
              <Button color="inherit" onClick={logout}>
                Cerrar Sesión
              </Button>
            </>
          ) : ( // Mostrar botones si no hay usuario autenticado
            <>
              <Button component={Link} to="/registro" color="inherit">
                Registro
              </Button>
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
