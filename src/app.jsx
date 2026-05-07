import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./components/Inicio";
import Vehiculos from "./components/Vehiculos";
import Espacios from "./components/Espacios";
import Tickets from "./components/Tickets";
import Administrador from "./components/Administrador";
import { EstacionamientoProvider } from "./Context/EstacionamientoContext";

// Aquí van todas las rutas posibles de la app.
// Con Route, cada URL se conecta directo a un componente.

function App() {
  return (
  <EstacionamientoProvider>
  <BrowserRouter>
  <Routes>
  {/* Layout es como el contenedor principal: trae el Sidebar y el <Outlet /> para mostrar lo demás */}
  <Route path="/" element={<Layout />}>
  {/* index es la ruta por defecto, así que si entras a "/", ves Inicio */}
  <Route index element={<Inicio />} />
  <Route path="vehiculos" element={<Vehiculos />} />
  <Route path="espacios" element={<Espacios />} />
  <Route path="tickets" element={<Tickets />} />
  <Route path="admin" element={<Administrador />} />
  </Route>
  </Routes>
  </BrowserRouter>
  </EstacionamientoProvider>
  );
}

export default App;