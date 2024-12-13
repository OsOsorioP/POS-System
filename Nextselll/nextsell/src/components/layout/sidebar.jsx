import { NavLink } from 'react-router-dom';
import './sidebar.css';
import { FaHome, FaShoppingCart, FaBoxes, FaUsers, FaChartBar, FaUserTie } from 'react-icons/fa'; // Importar íconos

const Sidebar = () => {
  const navItems = [
    { path: '/', label: 'Inicio', icon: <FaHome /> },
    { path: '/ventas', label: 'Ventas', icon: <FaShoppingCart /> },
    { path: '/inventario', label: 'Inventario', icon: <FaBoxes /> },
    { path: '/clientes', label: 'Clientes', icon: <FaUsers /> },
    { path: '/auditoria', label: 'Auditorias', icon: <FaChartBar /> },
    { path: '/empleados', label: 'Empleados', icon: <FaUserTie /> },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/LOGO horizontal.png" alt="NextSell Logo" />
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
