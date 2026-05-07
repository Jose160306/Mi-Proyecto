import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./components/Inicio";
import Vehiculos from "./components/Vehiculos";
import Espacios from "./components/Espacios";
import Tickets from "./components/Tickets";
import Administrador from "./components/Administrador";
import Perfil from "./components/Perfil";
import Login from "./components/Login";
import { EstacionamientoProvider } from "./Context/EstacionamientoContext";
import { AuthProvider, useAuth }   from "./Context/AuthContext";

// Aquí van todas las rutas posibles de la app.
// Con Route, cada URL se conecta directo a un componente.

function AppContent() {
const { usuarioActual } = useAuth();

// Si no hay usuario logueado, muestra el Login
if (!usuarioActual) return <Login />;

return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Layout />}>
<Route index element={<Inicio />} />
<Route path="vehiculos"    element={<Vehiculos />} />
<Route path="espacios"     element={<Espacios />} />
<Route path="tickets"      element={<Tickets />} />
<Route path="administrador" element={<Administrador />} />
<Route path="perfil"       element={<Perfil />} />
</Route>
</Routes>
</BrowserRouter>
);
}

function App() {
return (
<AuthProvider>
<EstacionamientoProvider>
<AppContent />
</EstacionamientoProvider>
</AuthProvider>
);
}

export default App;