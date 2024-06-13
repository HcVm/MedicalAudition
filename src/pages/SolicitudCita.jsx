import React, { useState } from 'react';
import CitaForm from '../components/CitaForm';
import { useNavigate } from 'react-router-dom';
import { solicitarCita } from '../services/apiService';
import { toast } from 'react-toastify'; 

function SolicitudCita() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (paciente, audiologoId, fechaHora) => {
    setIsLoading(true);
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
      }); 
      navigate('/confirmacion-cita', { state: { cita } });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Error desconocido al solicitar la cita');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Solicitar Cita</h1>
      <CitaForm onSubmit={handleSubmit} isLoading={isLoading} /> 
    </div>
  );
}

export default SolicitudCita;
