import React, { useState } from 'react';
import CitaForm from '../components/CitaForm';
import { useNavigate } from 'react-router-dom';
import { solicitarCita } from '../services/apiService';
import { toast } from 'react-toastify'; // Importar toast

function SolicitudCita() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (paciente, audiologoId, fechaHora) => {
    setIsLoading(true); // Mostrar indicador de carga
    try {
      const fecha = fechaHora.format('YYYY-MM-DD');
      const hora = fechaHora.format('HH:mm');
      const cita = await solicitarCita(paciente, audiologoId, fecha, hora);
      toast.success('Cita solicitada con éxito', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light", 
      }); // Mostrar notificación de éxito
      navigate('/confirmacion-cita', { state: { cita } });
    } catch (error) {
      // Manejo de errores más detallado
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Mostrar notificación de error
      } else {
        toast.error('Error desconocido al solicitar la cita');
      }
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <div>
      <h1>Solicitar Cita</h1>
      <CitaForm onSubmit={handleSubmit} isLoading={isLoading} /> {/* Pasar isLoading al formulario */}
    </div>
  );
}

export default SolicitudCita;
