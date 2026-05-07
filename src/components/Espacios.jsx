// RF3 parcial → muestra los espacios libres y ocupados//
// RF4 parcial → al dar clic crea un ticket (pero sin fecha y hora elegida por el usuario)//
import { useEstacionamiento } from "../Context/EstacionamientoContext";

function Espacios() {
  const { espacios, crearTicket } = useEstacionamiento();

  return (
  <section>
  <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
  Asignación de Espacios
  </h1>
  <p style={{ color: "#6b7280", marginBottom: 20, fontSize: 14 }}>
  Toca un espacio libre para crear un ticket
  </p>

  {/* Grid responsive: 4 columnas en movil, 5 en pantallas grandes */}
  <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 8
  }}>
  {espacios.map(espacio => (
    <div
    key={espacio.id}
    onClick={() => crearTicket(espacio.id)}
    style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 6px",
    borderRadius: 10,
    cursor: espacio.estado === "libre" ? "pointer" : "default",
    border: "2px solid",
    borderColor: espacio.estado === "libre" ? "#86efac" : "#fca5a5",
    background:   espacio.estado === "libre" ? "#dcfce7" : "#fee2e2",
    color:        espacio.estado === "libre" ? "#166534" : "#991b1b",
    gap: 2
    }}
    >
    <span style={{ fontSize: 16, fontWeight: 700 }}>{espacio.id}</span>
    <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
    {espacio.estado === "libre" ? "Libre" : "Ocupado"}
    </span>
    </div>
    ))}
    </div>
    </section>
  );
}

export default Espacios;