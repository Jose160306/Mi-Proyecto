import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

function Perfil() {
  const { usuarioActual, cambiarContrasena, logout } = useAuth();

  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena]   = useState("");
  const [confirmar, setConfirmar]               = useState("");
  const [mensaje, setMensaje]                   = useState("");
  const [error, setError]                       = useState("");

  function handleCambiar() {
    // Validaciones
    if (!contrasenaActual || !nuevaContrasena || !confirmar) {
      setError("Completa todos los campos");
      return;
    }
    if (contrasenaActual !== usuarioActual.contrasena) {
      setError("La contraseña actual no es correcta");
      return;
    }
    if (nuevaContrasena !== confirmar) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }
    if (nuevaContrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    cambiarContrasena(usuarioActual.noControl, nuevaContrasena);
    setError("");
    setMensaje("✅ Contraseña cambiada correctamente");
    setContrasenaActual("");
    setNuevaContrasena("");
    setConfirmar("");
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
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>
        Mi Perfil
      </h1>

      {/* Info del usuario */}
      <div style={{
        background: "white",
        borderRadius: 12,
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        marginBottom: 24,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}>
        <p style={{ margin: 0, fontSize: 15, color: "#374151" }}>
          <b>Nombre:</b> {usuarioActual.nombre}
        </p>
        <p style={{ margin: 0, fontSize: 15, color: "#374151" }}>
          <b>Número de control:</b> {usuarioActual.noControl}
        </p>
        <p style={{ margin: 0, fontSize: 15, color: "#374151" }}>
          <b>Rol:</b> {usuarioActual.esAdmin ? "Administrador" : "Estudiante"}
        </p>
      </div>

      {/* Cambiar contraseña */}
      <div style={{
        background: "white",
        borderRadius: 12,
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        maxWidth: 400
      }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>
          Cambiar contraseña
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            style={inputStyle}
            type="password"
            placeholder="Contraseña actual"
            value={contrasenaActual}
            onChange={e => setContrasenaActual(e.target.value)}
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Nueva contraseña"
            value={nuevaContrasena}
            onChange={e => setNuevaContrasena(e.target.value)}
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirmar}
            onChange={e => setConfirmar(e.target.value)}
          />

          {error   && <p style={{ color: "#991b1b", fontSize: 13, margin: 0 }}>{error}</p>}
          {mensaje && <p style={{ color: "#166534", fontSize: 13, margin: 0 }}>{mensaje}</p>}

          <button
            onClick={handleCambiar}
            style={{
              padding: "10px",
              background: "#1d4ed8",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14
            }}
          >
            Guardar contraseña
          </button>
        </div>
      </div>

      {/* Cerrar sesion */}
      <button
        onClick={logout}
        style={{
          marginTop: 24,
          padding: "10px 20px",
          background: "#fee2e2",
          color: "#991b1b",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 14
        }}
      >
        Cerrar sesión
      </button>
    </section>
  );
}

export default Perfil;
