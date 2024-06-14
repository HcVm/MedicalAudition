import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SolicitudCita from './pages/SolicitudCita';
import ConfirmacionCita from './pages/ConfirmacionCita';
import MisCitas from './pages/MisCitas';
import CalendarioDisponibilidad from './pages/CalendarioDisponibilidad';
import CrearPerfilMedico from './pages/CrearPerfilMedico';
import PerfilUsuario from './pages/PerfilUsuario';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solicitud-cita" element={<SolicitudCita />} />
          <Route path="/confirmacion-cita/:id" element={<ConfirmacionCita />} />
          <Route element={<PrivateRoute allowedRoles={['paciente']} />}>
            <Route path="/mis-citas" element={<MisCitas />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['audiólogo']} />}>
            <Route path="/calendario-disponibilidad" element={<CalendarioDisponibilidad />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['administrador', 'audiólogo']} />}>
            <Route path="/perfil" element={<PerfilUsuario />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['administrador']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
          <Route path="/crear-perfil-medico" element={<CrearPerfilMedico />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calendario-disponibilidad/:id" element={<CalendarioDisponibilidad />} /> 
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}



export default App;
