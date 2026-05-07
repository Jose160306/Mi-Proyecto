import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const items = [
  { to: "/",             label: "Inicio",         icon: "🏠", end: true },
  { to: "/vehiculos",    label: "Vehículos",       icon: "🚗" },
  { to: "/espacios",     label: "Espacios",        icon: "🅿️" },
  { to: "/tickets",      label: "Tickets",         icon: "🎫" },
  { to: "/administrador", label: "Administración", icon: "⚙️" },
  { to: "/perfil",       label: "Mi Perfil",       icon: "👤" },
];

function Layout() {
const [menuAbierto, setMenuAbierto] = useState(false);

function cerrarMenu() {
setMenuAbierto(false);
}

return (
<div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f1f5f9" }}>

{/* OVERLAY oscuro cuando el menu esta abierto en movil */}
{menuAbierto && (
<div
onClick={cerrarMenu}
style={{
position: "fixed",
inset: 0,
background: "rgba(0,0,0,0.5)",
zIndex: 40
}}
/>
)}

{/* SIDEBAR */}
<aside style={{
position: "fixed",
top: 0,
left: 0,
height: "100vh",
width: 240,
background: "#0f172a",
color: "white",
padding: "24px 12px",
display: "flex",
flexDirection: "column",
zIndex: 50,
// En movil se oculta con transform, en desktop siempre visible
transform: menuAbierto ? "translateX(0)" : "translateX(-100%)",
transition: "transform 0.3s ease",
}}>
{/* Boton cerrar en movil */}
<button
onClick={cerrarMenu}
style={{
alignSelf: "flex-end",
background: "transparent",
border: "none",
color: "#94a3b8",
fontSize: 22,
cursor: "pointer",
marginBottom: 8
}}
>
✕
</button>

<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, paddingLeft: 8 }}>
<span style={{ fontSize: 24 }}>🚗</span>
<h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Estacionamiento</h2>
</div>

<nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
{items.map(item => (
<NavLink
key={item.to}
to={item.to}
end={item.end}
onClick={cerrarMenu}
style={({ isActive }) => ({
display: "flex",
alignItems: "center",
gap: 10,
padding: "12px 16px",
borderRadius: 8,
textDecoration: "none",
fontSize: 15,
fontWeight: 500,
background: isActive ? "#1d4ed8" : "transparent",
color: isActive ? "white" : "#cbd5e1",
})}
>
<span style={{ fontSize: 18 }}>{item.icon}</span>
{item.label}
</NavLink>
))}
</nav>
</aside>

{/* CONTENIDO PRINCIPAL */}
<div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

{/* HEADER con boton hamburguesa */}
<header style={{
height: 60,
background: "white",
borderBottom: "1px solid #e2e8f0",
display: "flex",
alignItems: "center",
padding: "0 16px",
gap: 12,
position: "sticky",
top: 0,
zIndex: 30,
boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
}}>
{/* Boton hamburguesa */}
<button
onClick={() => setMenuAbierto(true)}
style={{
background: "transparent",
border: "none",
fontSize: 22,
cursor: "pointer",
color: "#0f172a",
padding: 4
}}
>
☰
</button>
<span style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>
🚗 Estacionamiento
</span>
</header>

{/* PAGINA ACTUAL */}
<main style={{ flex: 1, padding: "20px 16px", maxWidth: 700, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
<Outlet />
</main>

</div>
</div>
  );
}

export default Layout;