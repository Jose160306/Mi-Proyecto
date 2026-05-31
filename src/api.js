import axios from "axios";

// URL base del backend
const BASE_URL = "https://api-backend-estacionamiento-production.up.railway.app/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// ===== USUARIOS =====
export const loginUsuario = (noControl, contrasena) =>
  api.post("/usuarios/login", { noControl, contrasena });

export const registrarUsuario = (noControl, nombre, contrasena) =>
  api.post("/usuarios/registro", { noControl, nombre, contrasena });

export const cambiarContrasena = (noControl, nuevaContrasena) =>
  api.put(`/usuarios/contrasena/${noControl}`, { nuevaContrasena });

// ===== ESPACIOS =====
export const obtenerEspacios = () =>
  api.get("/espacios");

export const actualizarEspacio = (numero, estado) =>
  api.put(`/espacios/${numero}`, { estado });

// ===== TICKETS =====
export const obtenerTickets = () =>
  api.get("/tickets");

export const crearTicket = (espacio, usuario, noControl, fecha) =>
  api.post("/tickets/crear", { espacio, usuario, noControl, fecha });

export const cancelarTicket = (id) =>
  api.put(`/tickets/cancelar/${id}`);

// ===== VEHICULOS =====
export const obtenerVehiculos = () =>
  api.get("/vehiculos");

export const registrarVehiculo = (placa, marca, modelo, noControl) =>
  api.post("/vehiculos/registrar", { placa, marca, modelo, noControl });

export const eliminarVehiculo = (id) =>
  api.delete(`/vehiculos/eliminar/${id}`);