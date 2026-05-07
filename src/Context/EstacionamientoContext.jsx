import { createContext, useContext, useState } from "react";
const EstacionamientoContext = createContext();

const espaciosIniciales = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  estado: "libre",
}));

// Este componente envuelve toda la app y comparte el estado con todos los hijos
export function EstacionamientoProvider({ children }) {
  const [vehiculos, setVehiculos] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [espacios, setEspacios] = useState(espaciosIniciales);

  function agregarVehiculo(nuevoVehiculo) {
    setVehiculos(prev => [...prev, nuevoVehiculo]);
  }

  function crearTicket(idEspacio) {
    const espacio = espacios.find(e => e.id === idEspacio);
    if (!espacio || espacio.estado === "ocupado") {
      alert("Ese espacio ya está ocupado");
      return;
    }
    setEspacios(espacios.map(e =>
      e.id === idEspacio ? { ...e, estado: "ocupado" } : e
    ));
    setTickets(prev => [
      ...prev,
      {
        id: prev.length + 1,
        espacio: idEspacio,
        fecha: new Date().toLocaleTimeString(),
      }
    ]);
  }

  function cambiarEstado(idEspacio) {
  setEspacios(espacios.map(e =>
    e.id === idEspacio
      ? { ...e, estado: e.estado === "libre" ? "ocupado" : "libre" }
      : e
  ));
}

function cancelarTicket(idTicket, idEspacio) {
  // Marca el ticket como cancelado
  setTickets(prev =>
    prev.map(t =>
      t.id === idTicket ? { ...t, cancelado: true } : t
    )
  );
  // Libera el espacio de nuevo
  setEspacios(espacios.map(e =>
    e.id === idEspacio ? { ...e, estado: "libre" } : e
  ));
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

// Un hook sencillo para acceder al contexto sin rodeos
export function useEstacionamiento() {
  return useContext(EstacionamientoContext);
}