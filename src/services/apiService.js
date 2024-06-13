import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; 

// Función auxiliar para obtener el token de localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Función auxiliar para configurar los encabezados de las peticiones autenticadas
const authHeader = () => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

// Pacientes
export const solicitarCita = async (paciente, audiologoId, fecha, hora) => {
  try {
    const response = await axios.post(`${API_URL}/citas`, { paciente, audiologoId, fecha, hora });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const obtenerCitasPaciente = async (dniPaciente) => {
  try {
    const response = await axios.get(`${API_URL}/citas/paciente/${dniPaciente}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const cancelarCita = async (citaId) => {
  try {
    const response = await axios.delete(`${API_URL}/citas/${citaId}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Audiólogos
export const getAudiologos = async () => {
  try {
    const response = await axios.get(`${API_URL}/audiologos`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAudiologoById = async (audiologoId) => {
  try {
    const response = await axios.get(`${API_URL}/audiologos/${audiologoId}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const actualizarHorarioAudiologo = async (audiologoId, nuevoHorario) => {
  try {
    const response = await axios.put(`${API_URL}/audiologos/${audiologoId}`, { horario_disponibilidad: nuevoHorario }, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUsuarioById = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/${usuarioId}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualizar un usuario
export const actualizarUsuario = async (usuarioId, datosUsuario) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/${usuarioId}`, datosUsuario, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener todos los pacientes
export const getPacientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/pacientes`, { headers: authHeader() }); // Asegúrate de requerir autenticación si es necesario
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener todas las citas
export const getCitas = async () => {
  try {
    const response = await axios.get(`${API_URL}/citas`, { headers: authHeader() }); // Asegúrate de requerir autenticación si es necesario
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getCitaById = async (citaId) => {
  try {
    const response = await axios.get(`${API_URL}/citas/${citaId}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data; 
  }
};

// ... (funciones para otras entidades: Atenciones, HistorialesMedicos, Pagos, Inventario, Suministros)

// Usuarios (para audiólogos y administradores)
export const crearUsuario = async (datosUsuario) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/register`, datosUsuario);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUsuario = async (nombre_usuario, contraseña) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/login`, { nombre_usuario, contraseña });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// ... (otras funciones para obtener, actualizar y eliminar usuarios, solo para administradores)
