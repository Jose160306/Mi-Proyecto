//RF3
import { useEstacionamiento } from "../Context/EstacionamientoContext";
import { useAuth } from "../Context/AuthContext";
import StatCard from "./StatCard";

function Inicio() {
  const { vehiculos, tickets, espacios } = useEstacionamiento();
  const { usuarioActual } = useAuth();
  const espaciosLibres = espacios.filter(e => e.estado === "libre").length;

  return (
  <section>
  <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
  Panel Principal
  </h1>
  <p style={{ color: "#6b7280", marginBottom: 24, fontSize: 14 }}>
  Bienvenido, <b style={{ color: "#0f172a" }}>{usuarioActual.nombre}</b>
  </p>

  {/* Tarjetas en columna en movil */}
  <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 12
  }}>
    <StatCard label="Vehículos"       value={vehiculos.length} color="#3b82f6" icon="🚗" />
    <StatCard label="Espacios libres" value={espaciosLibres}   color="#22c55e" icon="🅿️" />
    <StatCard label="Tickets hoy"     value={tickets.length}   color="#f59e0b" icon="🎫" />
    </div>
    </section>
  );
}

export default Inicio;