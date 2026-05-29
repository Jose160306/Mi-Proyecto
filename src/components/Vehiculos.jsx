import { useState } from "react";
import { useEstacionamiento } from "../Context/EstacionamientoContext";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";

function Vehiculos() {
  const { vehiculos, agregarVehiculo } = useEstacionamiento();
  const { usuarioActual } = useAuth();
  const [form, setForm] = useState({ placa: "", marca: "", modelo: "" });

  async function handleGuardar() {
    if (!form.placa) { alert("Ingresa las placas"); return; }

    const resultado = await agregarVehiculo({
      ...form,
      noControl: usuarioActual.noControl
    });

    if (resultado?.ok === false) {
      Swal.fire("Error", resultado.mensaje, "error");
      return;
    }

    setForm({ placa: "", marca: "", modelo: "" });
    Swal.fire("Guardado", "Vehículo registrado correctamente", "success");
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box"
  };

  return (
    <section>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>
        Registro de Vehículos
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        <input style={inputStyle} placeholder="Placas"  value={form.placa}
          onChange={e => setForm({ ...form, placa: e.target.value })} />
        <input style={inputStyle} placeholder="Marca"   value={form.marca}
          onChange={e => setForm({ ...form, marca: e.target.value })} />
        <input style={inputStyle} placeholder="Modelo"  value={form.modelo}
          onChange={e => setForm({ ...form, modelo: e.target.value })} />
        <button onClick={handleGuardar} style={{
          padding: "12px",
          background: "#1d4ed8",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 15,
          fontWeight: 700
        }}>
          Guardar
        </button>
      </div>

      <h3 style={{ fontSize: 15, color: "#374151", marginBottom: 12 }}>Lista:</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {vehiculos.map(v => (
          <li key={v._id} style={{
            display: "flex", alignItems: "center", gap: 10, background: "white",
            padding: "12px 16px", borderRadius: 8,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)", fontSize: 14, color: "#1f2937"
          }}>
            <span style={{ fontSize: 18 }}>🚗</span>
            {v.placa} — {v.marca} {v.modelo}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Vehiculos;