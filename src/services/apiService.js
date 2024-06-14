import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const getToken = () => {
  return localStorage.getItem('token');
};

const authHeader = () => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

export const solicitarCita = async (paciente, audiologoId, fecha, hora) => {
  try {
    const response = await axios.post(`${API_URL}/citas`, { paciente, audiologoId, fecha, hora }, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const obtenerCitasPaciente = async (dniPaciente) => {
  try {
    const response = await axios.get(`${API_URL}/citas/paciente/${dniPaciente}`, { headers: authHeader() });
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

export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data; 
  }
};

export const getAudiologos = async () => {
  try {
    const response = await axios.get(`${API_URL}/audiologos`);
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
    const response = await axios.put(`${API_URL}/audiologos/${audiologoId}/horario`, { horario_disponibilidad: nuevoHorario }, { headers: authHeader() });
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

export const actualizarUsuario = async (usuarioId, datosUsuario) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/${usuarioId}`, datosUsuario, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getPacientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/pacientes`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCitas = async () => {
  try {
    const response = await axios.get(`${API_URL}/citas`, { headers: authHeader() });
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

export const crearAudiologo = async (datosAudiologo) => {
  try {
    const response = await axios.post(`${API_URL}/audiologos`, datosAudiologo, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const crearUsuario = async (datosUsuario) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/register`, datosUsuario, { headers: authHeader() });
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