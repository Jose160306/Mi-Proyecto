import Swal from "sweetalert2";
import { useEstacionamiento } from "../Context/EstacionamientoContext";
import { useAuth } from "../Context/AuthContext";

function Tickets() {
  const { tickets, cancelarTicket, eliminarTicketCancelado } = useEstacionamiento();
  const { usuarioActual } = useAuth();

  function handleCancelar(id, espacio) {
    Swal.fire({
      title: "¿Cancelar reserva?",
      text: "Se liberará el espacio asignado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1d4ed8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        cancelarTicket(id, espacio);
        Swal.fire("Cancelado", "La reserva fue cancelada", "success");
      }
    });
  }

  async function handleEliminar(id) {
    const result = await Swal.fire({
      title: "¿Eliminar ticket?",
      text: "Este ticket cancelado se eliminará permanentemente de la base de datos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No"
    });
    
    if (result.isConfirmed) {
      const res = await eliminarTicketCancelado(id);
      if (res.ok) {
        Swal.fire("Eliminado", "El ticket cancelado fue eliminado", "success");
      } else {
        Swal.fire("Error", res.mensaje, "error");
      }
    }
  }

  return (
    <section>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
        Tickets
      </h1>
      {tickets.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>No hay tickets registrados.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {tickets.map(t => (
            <li
              key={t._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "white",
                padding: "12px 16px",
                borderRadius: 8,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                fontSize: 14,
                color: "#1f2937"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>🎫</span>
                  <span style={{ fontWeight: 600 }}>Ticket</span>
                  {t.cancelado && (
                    <span style={{
                      background: "#fee2e2",
                      color: "#991b1b",
                      padding: "2px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700
                    }}>
                      CANCELADO
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 12, color: "#6b7280", paddingLeft: 26 }}>
                  📍 Espacio {t.espacio} · 🕐 {t.fecha} · 👤 {t.usuario}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                {!t.cancelado && (
                  <button
                    onClick={() => handleCancelar(t._id, t.espacio)}
                    style={{
                      padding: "6px 14px",
                      background: "#fee2e2",
                      color: "#991b1b",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 13,
                      flexShrink: 0
                    }}
                  >
                    Cancelar
                  </button>
                )}
                
                {usuarioActual?.esAdmin && t.cancelado && (
                  <button
                    onClick={() => handleEliminar(t._id)}
                    style={{
                      padding: "6px 14px",
                      background: "#e5e7eb",
                      color: "#dc2626",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 13,
                      flexShrink: 0
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Tickets;