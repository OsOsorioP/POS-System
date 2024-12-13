import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./../../assets/styles/auditoria.css";

const Auditoria = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [datos, setDatos] = useState([]);

  // Simulación de datos traídos del backend
  useEffect(() => {
    if (reporteSeleccionado === "ventas") {
      setDatos([
        { id: 1, fecha: "2023-12-01", cliente: "Juan Pérez", monto: 150.0, metodoPago: "Efectivo", empleado: "Ana López" },
        { id: 2, fecha: "2023-12-02", cliente: "Ana López", monto: 200.0, metodoPago: "Tarjeta de Crédito", empleado: "Juan Pérez" },
      ]);
    } else if (reporteSeleccionado === "inventario") {
      setDatos([
        { id: 1, producto: "Mouse", stock: 50, nivelReorden: 20 },
        { id: 2, producto: "Teclado", stock: 30, nivelReorden: 10 },
      ]);
    } else if (reporteSeleccionado === "empleados") {
      setDatos([
        { id: 1, nombre: "Juan Pérez", rol: "Cajero", ventasRealizadas: 10 },
        { id: 2, nombre: "Ana López", rol: "Administrador", ventasRealizadas: 5 },
      ]);
    }
  }, [reporteSeleccionado]);

  // Función para exportar el reporte en PDF
  const exportarPDF = () => {
    const doc = new jsPDF();
    let columns = [];
    let rows = [];

    if (reporteSeleccionado === "ventas") {
      columns = ["ID", "Fecha", "Cliente", "Monto", "Método de Pago", "Empleado"];
      rows = datos.map((venta) => [
        venta.id,
        venta.fecha,
        venta.cliente,
        `$${venta.monto.toFixed(2)}`,
        venta.metodoPago,
        venta.empleado,
      ]);
    } else if (reporteSeleccionado === "inventario") {
      columns = ["ID", "Producto", "Stock Actual", "Nivel de Reorden"];
      rows = datos.map((item) => [item.id, item.producto, item.stock, item.nivelReorden]);
    } else if (reporteSeleccionado === "empleados") {
      columns = ["ID", "Nombre", "Rol", "Ventas Realizadas"];
      rows = datos.map((empleado) => [
        empleado.id,
        empleado.nombre,
        empleado.rol,
        empleado.ventasRealizadas,
      ]);
    } else {
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
    if (reporteSeleccionado === "ventas") {
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
    } else if (reporteSeleccionado === "inventario") {
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
    } else if (reporteSeleccionado === "empleados") {
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
    }
    return <p>Selecciona un tipo de reporte para visualizar los datos.</p>;
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
