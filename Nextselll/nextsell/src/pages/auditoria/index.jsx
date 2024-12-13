import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./../../assets/styles/auditoria.css";

const Auditoria = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar datos desde el backend
  useEffect(() => {
    if (!reporteSeleccionado) return;

    setLoading(true);
    setError(null);

    let endpoint = "";

    switch (reporteSeleccionado) {
      case "ventas":
        endpoint = "http://localhost:8080/reportes/ventas";
        break;
      case "inventario":
        endpoint = "http://localhost:8080/reportes/inventario";
        break;
      case "empleados":
        endpoint = "http://localhost:8080/reportes/empleados";
        break;
      default:
        setLoading(false);
        return;
    }

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los datos del reporte");
        }
        return res.json();
      })
      .then((data) => setDatos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [reporteSeleccionado]);

  // Función para exportar el reporte en PDF
  const exportarPDF = () => {
    if (!datos.length) {
      alert("No hay datos para exportar");
      return;
    }

    const doc = new jsPDF();
    let columns = [];
    let rows = [];

    switch (reporteSeleccionado) {
      case "ventas":
        columns = ["ID", "Fecha", "Cliente", "Monto", "Método de Pago", "Empleado"];
        rows = datos.map((venta) => [
          venta.id,
          venta.fecha,
          venta.cliente,
          `$${venta.monto.toFixed(2)}`,
          venta.metodoPago,
          venta.empleado,
        ]);
        break;
      case "inventario":
        columns = ["ID", "Producto", "Stock Actual", "Nivel de Reorden"];
        rows = datos.map((item) => [item.id, item.producto, item.stock, item.nivelReorden]);
        break;
      case "empleados":
        columns = ["ID", "Nombre", "Rol", "Ventas Realizadas"];
        rows = datos.map((empleado) => [
          empleado.id,
          empleado.nombre,
          empleado.rol,
          empleado.ventasRealizadas,
        ]);
        break;
      default:
        alert("Selecciona un tipo de reporte antes de exportar.");
        return;
    }

    doc.text(
      `Reporte de ${reporteSeleccionado.charAt(0).toUpperCase() + reporteSeleccionado.slice(1)}`,
      14,
      20
    );
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });

    doc.save(`${reporteSeleccionado}_reporte.pdf`);
  };

  const generarReporte = () => {
    if (loading) {
      return <p className="report-success">Cargando datos...</p>;
    }

    if (error) {
      return <p className="report-error">Error: {error}</p>;
    }

    if (!datos.length) {
      return <p className="report-error">No hay datos disponibles para este reporte.</p>;
    }

    switch (reporteSeleccionado) {
      case "ventas":
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Método de Pago</th>
                <th>Empleado</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.fecha}</td>
                  <td>{venta.cliente}</td>
                  <td>${venta.monto.toFixed(2)}</td>
                  <td>{venta.metodoPago}</td>
                  <td>{venta.empleado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "inventario":
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Stock Actual</th>
                <th>Nivel de Reorden</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.producto}</td>
                  <td>{item.stock}</td>
                  <td>{item.nivelReorden}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "empleados":
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Ventas Realizadas</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((empleado) => (
                <tr key={empleado.id}>
                  <td>{empleado.id}</td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.rol}</td>
                  <td>{empleado.ventasRealizadas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return <p>Selecciona un tipo de reporte para visualizar los datos.</p>;
    }
  };

  return (
    <div className="main-content">
      <h1 className="report-title">Generador de Reportes</h1>
      <div className="report-options">
        <button className="report-button" onClick={() => setReporteSeleccionado("ventas")}>
          Reporte de Ventas
        </button>
        <button className="report-button" onClick={() => setReporteSeleccionado("inventario")}>
          Reporte de Inventario
        </button>
        <button className="report-button" onClick={() => setReporteSeleccionado("empleados")}>
          Reporte de Empleados
        </button>
        <button className="export-button" onClick={exportarPDF}>
          Exportar a PDF
        </button>
      </div>
      <div className="report-container">{generarReporte()}</div>
    </div>
  );
};

export default Auditoria;
