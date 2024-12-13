import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./../../assets/styles/ventas.css";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("tabla");
  const [nuevaVenta, setNuevaVenta] = useState({
    clienteId: "",
    empleadoId: "",
    metodoPagoId: "",
    productoId: "",
    cantidad: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error al cargar clientes:", err));

    fetch("http://localhost:8080/empleados")
      .then((res) => res.json())
      .then((data) => setEmpleados(data))
      .catch((err) => console.error("Error al cargar empleados:", err));

    fetch("http://localhost:8080/metodoPagos")
      .then((res) => res.json())
      .then((data) => setMetodosPago(data))
      .catch((err) => console.error("Error al cargar métodos de pago:", err));

    fetch("http://localhost:8080/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));

    fetch("http://localhost:8080/transaccionVentas")
      .then((res) => res.json())
      .then((data) => setVentas(data))
      .catch((err) => console.error("Error al cargar ventas:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaVenta((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVenta = (e) => {
    e.preventDefault();

    const producto = productos.find((p) => p.id === parseInt(nuevaVenta.productoId));
    const montoTotal = parseInt(nuevaVenta.cantidad) * producto.precio;

    const nuevaTransaccion = {
      clienteId: parseInt(nuevaVenta.clienteId),
      empleadoId: parseInt(nuevaVenta.empleadoId),
      metodoPagoId: parseInt(nuevaVenta.metodoPagoId),
      productos: [
        {
          productoId: parseInt(nuevaVenta.productoId),
          cantidad: parseInt(nuevaVenta.cantidad),
          precioUnidad: producto.precio,
        },
      ],
      montoTotal,
    };

    fetch("http://localhost:8080/transaccionVentas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaTransaccion),
    })
      .then((res) => res.json())
      .then((data) => {
        setVentas([...ventas, { ...data, cliente: nuevaVenta.clienteId, empleado: nuevaVenta.empleadoId }]);
        setNuevaVenta({
          clienteId: "",
          empleadoId: "",
          metodoPagoId: "",
          productoId: "",
          cantidad: "",
        });
        setView("tabla");
      })
      .catch((err) => console.error("Error al registrar venta:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/transaccionVentas/${id}`, {
      method: "DELETE",
    })
      .then(() => setVentas(ventas.filter((venta) => venta.id !== id)))
      .catch((err) => console.error("Error al eliminar venta:", err));
  };

  const filteredVentas = ventas.filter(
    (venta) =>
      venta.producto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.cliente?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTabla = () => (
    <div className="ventas-container">
      <h1 className="ventas-title">Gestión de Ventas</h1>
      <div className="ventas-actions">
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar venta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setView("formulario")} className="add-venta-button">
          Registrar Venta
        </button>
      </div>
      <table className="ventas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Monto Total</th>
            <th>Método de Pago</th>
            <th>Empleado</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredVentas.length > 0 ? (
            filteredVentas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.fecha}</td>
                <td>{venta.producto}</td>
                <td>{venta.cantidad}</td>
                <td>${venta.montoTotal.toFixed(2)}</td>
                <td>{venta.metodoPago}</td>
                <td>{venta.empleado}</td>
                <td>{venta.cliente}</td>
                <td className="action-buttons">
                  <button className="icon-button" onClick={() => alert("Editar no implementado")}>
                    <FaEdit className="edit-icon" />
                  </button>
                  <button className="icon-button" onClick={() => handleDelete(venta.id)}>
                    <FaTrash className="delete-icon" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-results">
                No se encontraron ventas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderFormulario = () => (
    <form className="ventas-form" onSubmit={handleAddVenta}>
      <h2>Registrar Nueva Venta</h2>
      <div className="form-group">
        <label>Cliente:</label>
        <select name="clienteId" onChange={handleInputChange} value={nuevaVenta.clienteId} required>
          <option value="">Selecciona un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Empleado:</label>
        <select name="empleadoId" onChange={handleInputChange} value={nuevaVenta.empleadoId} required>
          <option value="">Selecciona un empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.id} value={empleado.id}>
              {empleado.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Método de Pago:</label>
        <select name="metodoPagoId" onChange={handleInputChange} value={nuevaVenta.metodoPagoId} required>
          <option value="">Selecciona un método</option>
          {metodosPago.map((metodo) => (
            <option key={metodo.id} value={metodo.id}>
              {metodo.metodo}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Producto:</label>
        <select name="productoId" onChange={handleInputChange} value={nuevaVenta.productoId} required>
          <option value="">Selecciona un producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Cantidad:</label>
        <input
          type="number"
          name="cantidad"
          value={nuevaVenta.cantidad}
          onChange={handleInputChange}
          min="1"
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="form-submit-button">
          Registrar Venta
        </button>
        <button type="button" className="form-cancel-button" onClick={() => setView("tabla")}>
          Cancelar
        </button>
      </div>
    </form>
  );

  return <>{view === "tabla" ? renderTabla() : renderFormulario()}</>;
};

export default Ventas;
