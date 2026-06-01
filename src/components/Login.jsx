import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";

function Login() {
  const { login, registrar } = useAuth();

  const [modo, setModo] = useState("login");
  const [noControl, setNoControl]   = useState("");
  const [nombre, setNombre]         = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError]           = useState("");

  async function handleLogin() {
    if (!noControl || !contrasena) {
      setError("Completa todos los campos");
      return;
    }
    const resultado = await login(noControl, contrasena);
    if (!resultado.ok) {
      setError(resultado.mensaje);
    }
  }

  async function handleRegistrar() {
    if (!noControl || !nombre || !contrasena) {
      setError("Completa todos los campos");
      return;
    }
    const resultado = await registrar(noControl, nombre, contrasena);
    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }
    setError("");
    setModo("login");
    setNoControl("");
    setContrasena("");
    await Swal.fire({
      icon: "success",
      title: "¡Registro exitoso!",
      text: "Ahora inicia sesión",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#1d4ed8"
    });
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
    <div style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "white",
        borderRadius: 16,
        padding: "40px 36px",
        width: 360,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: 40 }}>🚗</span>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: "8px 0 4px" }}>
            Estacionamiento
          </h1>
          <p style={{ color: "#6b7280", fontSize: 13 }}>
            {modo === "login" ? "Inicia sesión para continuar" : "Crea tu cuenta"}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            style={inputStyle}
            placeholder="Número de control"
            value={noControl}
            onChange={e => setNoControl(e.target.value)}
          />

          {modo === "registro" && (
            <input
              style={inputStyle}
              placeholder="Nombre completo"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          )}

          <input
            style={inputStyle}
            placeholder="Contraseña"
            type="password"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
          />

          {error && (
            <p style={{ color: "#991b1b", fontSize: 13, margin: 0 }}>{error}</p>
          )}

          <button
            onClick={modo === "login" ? handleLogin : handleRegistrar}
            style={{
              padding: "11px",
              background: "#1d4ed8",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
              marginTop: 4
            }}
          >
            {modo === "login" ? "Iniciar sesión" : "Registrarse"}
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", margin: 0 }}>
            {modo === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <span
              onClick={() => { setModo(modo === "login" ? "registro" : "login"); setError(""); }}
              style={{ color: "#1d4ed8", cursor: "pointer", fontWeight: 600 }}
            >
              {modo === "login" ? "Regístrate" : "Inicia sesión"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;