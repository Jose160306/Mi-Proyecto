import { createContext, useContext, useState } from "react";
import * as api from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(null);

  // Registrar nuevo usuario en MongoDB
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

  // Login con MongoDB
  async function login(noControl, contrasena) {
    try {
      const res = await api.loginUsuario(noControl, contrasena);
      if (res.data.ok) {
        setUsuarioActual(res.data.data);
        return { ok: true };
      }
      return { ok: false, mensaje: res.data.message };
    } catch (error) {
      const mensaje = error.response?.data?.message || "Error al iniciar sesión";
      return { ok: false, mensaje };
    }
  }

  // Cerrar sesion
  function logout() {
    setUsuarioActual(null);
  }

  // Cambiar la contrasena - verifica la actual con bcrypt en el backend
  async function cambiarContrasena(noControl, contrasenaActual, nuevaContrasena) {
    try {
      // Primero verificamos la contraseña actual haciendo en login
      const verificacion = await api.loginUsuario(noControl, contrasenaActual);
      if (!verificacion.data.ok) {
        return { ok: false, mensaje: "La contraseña actual no es correcta" };
      }

      // Si es correcta, actualizamos con la nueva
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