import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/layout/sidebar";
import Bienvenida from "./pages/bienvenida/bienvenida";
import Ventas from "./pages/ventas/index";
import Inventario from "./pages/inventario/index";
import Clientes from "./pages/clientes/index";
import Auditoria from "./pages/auditoria/index";
import Empleados from "./pages/empleados/index";
import Login from "./pages/login/login";
import "./App.css"; // Global styles

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Bienvenida />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/auditoria" element={<Auditoria />} />
              <Route path="/empleados" element={<Empleados />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
};

export default App;
