import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../api";

const EstacionamientoContext = createContext();

export function EstacionamientoProvider({ children }) {
  const [vehiculos, setVehiculos] = useState([]);
  const [tickets,   setTickets]   = useState([]);
  const [espacios,  setEspacios]  = useState([]);

  // Al cargar la app obtiene los datos de MongoDB
  useEffect(() => {
    cargarEspacios();
    cargarTickets();
    cargarVehiculos();
  }, []);

  async function cargarEspacios() {
    try {
      const res = await api.obtenerEspacios();
      setEspacios(res.data.data);
    } catch (error) {
      console.log("Error al cargar espacios", error);
    }
  }

  async function cargarTickets() {
    try {
      const res = await api.obtenerTickets();
      setTickets(res.data.data);
    } catch (error) {
      console.log("Error al cargar tickets", error);
    }
  }

  async function cargarVehiculos() {
    try {
      const res = await api.obtenerVehiculos();
      setVehiculos(res.data.data);
    } catch (error) {
      console.log("Error al cargar vehículos", error);
    }
  }

  // Agregar vehiculo en MongoDB
  async function agregarVehiculo(nuevoVehiculo) {
    try {
      const { placa, marca, modelo } = nuevoVehiculo;
      const noControl = nuevoVehiculo.noControl || "";
      const res = await api.registrarVehiculo(placa, marca, modelo, noControl);
      if (res.data.ok) {
        setVehiculos(prev => [res.data.data, ...prev]);
        return { ok: true };
      }
      return { ok: false, mensaje: res.data.message };
    } catch (error) {
      const mensaje = error.response?.data?.message || "Error al registrar vehículo";
      return { ok: false, mensaje };
    }
  }

  // Crear ticket en MongoDB
  async function crearTicket(idEspacio, nombreUsuario, noControl) {
    try {
      const espacio = espacios.find(e => e.numero === idEspacio);
      if (!espacio || espacio.estado === "ocupado") {
        alert("Ese espacio ya está ocupado");
        return;
      }
      const fecha = new Date().toLocaleTimeString();
      const res = await api.crearTicket(idEspacio, nombreUsuario, noControl, fecha);
      if (res.data.ok) {
        // Actualizar estado local
        setEspacios(prev => prev.map(e =>
          e.numero === idEspacio ? { ...e, estado: "ocupado" } : e
        ));
        setTickets(prev => [res.data.data, ...prev]);
      }
    } catch (error) {
      console.log("Error al crear ticket", error);
    }
  }

  // Cambiar estado de espacio en MongoDB
  async function cambiarEstado(idEspacio) {
    try {
      const espacio = espacios.find(e => e.numero === idEspacio);
      const nuevoEstado = espacio.estado === "libre" ? "ocupado" : "libre";
      await api.actualizarEspacio(idEspacio, nuevoEstado);
      setEspacios(prev => prev.map(e =>
        e.numero === idEspacio ? { ...e, estado: nuevoEstado } : e
      ));
    } catch (error) {
      console.log("Error al cambiar estado", error);
    }
  }

  // Cancelar ticket en MongoDB
  async function cancelarTicket(idTicket, idEspacio) {
    try {
      await api.cancelarTicket(idTicket);
      setTickets(prev => prev.map(t =>
        t._id === idTicket ? { ...t, cancelado: true } : t
      ));
      setEspacios(prev => prev.map(e =>
        e.numero === idEspacio ? { ...e, estado: "libre" } : e
      ));
    } catch (error) {
      console.log("Error al cancelar ticket", error);
    }
  }

  return (
    <EstacionamientoContext.Provider value={{
      vehiculos,
      tickets,
      espacios,
      agregarVehiculo,
      crearTicket,
      cambiarEstado,
      cancelarTicket,
    }}>
      {children}
    </EstacionamientoContext.Provider>
  );
}

export function useEstacionamiento() {
  return useContext(EstacionamientoContext);
}