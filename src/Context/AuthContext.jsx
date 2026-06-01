import { createContext, useContext, useState } from "react";
import * as api from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Recupera el usuario guardado al iniciar
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  async function registrar(noControl, nombre, contrasena) {
    try {
      const res = await api.registrarUsuario(noControl, nombre, contrasena);
      if (res.data.ok) return { ok: true };
      return { ok: false, mensaje: res.data.message };
    } catch (error) {
      const mensaje = error.response?.data?.message || "Error al registrar";
      return { ok: false, mensaje };
    }
  }

  async function login(noControl, contrasena) {
    try {
      const res = await api.loginUsuario(noControl, contrasena);
      if (res.data.ok) {
        setUsuarioActual(res.data.data);
        // Guarda el usuario en localStorage
        localStorage.setItem("usuario", JSON.stringify(res.data.data));
        return { ok: true };
      }
      return { ok: false, mensaje: res.data.message };
    } catch (error) {
      const mensaje = error.response?.data?.message || "Error al iniciar sesión";
      return { ok: false, mensaje };
    }
  }

  function logout() {
    setUsuarioActual(null);
    // Borra el usuario al cerrar sesión
    localStorage.removeItem("usuario");
  }

  async function cambiarContrasena(noControl, contrasenaActual, nuevaContrasena) {
    try {
      const verificacion = await api.loginUsuario(noControl, contrasenaActual);
      if (!verificacion.data.ok) {
        return { ok: false, mensaje: "La contraseña actual no es correcta" };
      }
      const res = await api.cambiarContrasena(noControl, nuevaContrasena);
      if (res.data.ok) return { ok: true };
      return { ok: false, mensaje: res.data.message };
    } catch (error) {
      return { ok: false, mensaje: "La contraseña actual no es correcta" };
    }
  }

  return (
    <AuthContext.Provider value={{
      usuarioActual,
      registrar,
      login,
      logout,
      cambiarContrasena
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}