import Swal from "sweetalert2";
import { useEstacionamiento } from "../Context/EstacionamientoContext";

function Administrador() {
  const { espacios, cambiarEstado } = useEstacionamiento();

  function handleCambiarEstado(numero, estadoActual) {
    const accion = estadoActual === "libre" ? "marcar como ocupado" : "marcar como libre";
    Swal.fire({
      title: "¿Cambiar estado?",
      text: `¿Deseas ${accion} este espacio?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1d4ed8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiar",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        cambiarEstado(numero);  //ahora pasamos el número del espacio
        Swal.fire("Listo", "El estado fue actualizado", "success");
      }
    });
  }

  return (
    <section>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
        Administración de Espacios
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 20, fontSize: 14 }}>
        Cambia el estado de cada espacio cuando lo necesites.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {espacios.map(e => (
          <div key={e._id} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "white",
            padding: "12px 16px",
            borderRadius: 10,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>
                Espacio {e.numero}
              </span>
              <span style={{
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                background: e.estado === "libre" ? "#dcfce7" : "#fee2e2",
                color: e.estado === "libre" ? "#166534" : "#991b1b"
              }}>
                {e.estado === "libre" ? "Libre" : "Ocupado"}
              </span>
            </div>

            <button
              onClick={() => handleCambiarEstado(e.numero, e.estado)}
              style={{
                padding: "6px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 12,
                background: e.estado === "libre" ? "#fee2e2" : "#dcfce7",
                color: e.estado === "libre" ? "#991b1b" : "#166534"
              }}
            >
              {e.estado === "libre" ? "Marcar ocupado" : "Marcar libre"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Administrador;