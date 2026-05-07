import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Usuario administrador por defecto
const usuariosIniciales = [
  {
    noControl: "admin",
    nombre: "Administrador",
    contrasena: "123456789",
    esAdmin: true
  }
];

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [usuarioActual, setUsuarioActual] = useState(null);

  // Registrar nuevo usuario
  function registrar(noControl, nombre, contrasena) {
    // Verificar que el numero de control no exista ya
    const existe = usuarios.find(u => u.noControl === noControl);
    if (existe) {
      return { ok: false, mensaje: "Ese número de control ya está registrado" };
    }
    const nuevoUsuario = {
      noControl,
      nombre,
      contrasena,
      esAdmin: false
    };
    setUsuarios(prev => [...prev, nuevoUsuario]);
    return { ok: true };
  }

  // Iniciar sesion
  function login(noControl, contrasena) {
    const usuario = usuarios.find(
      u => u.noControl === noControl && u.contrasena === contrasena
    );
    if (!usuario) {
      return { ok: false, mensaje: "Número de control o contraseña incorrectos" };
    }
    setUsuarioActual(usuario);
    return { ok: true };
  }

  // Cerrar sesion
  function logout() {
    setUsuarioActual(null);
  }

  // Cambiar contraseña
  function cambiarContrasena(noControl, nuevaContrasena) {
    setUsuarios(prev =>
      prev.map(u =>
        u.noControl === noControl ? { ...u, contrasena: nuevaContrasena } : u
      )
    );
    // Actualizar tambien el usuario actual
    setUsuarioActual(prev => ({ ...prev, contrasena: nuevaContrasena }));
    return { ok: true };
  }

  return (
    <AuthContext.Provider value={{
      usuarioActual,
      usuarios,
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
