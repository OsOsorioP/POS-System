import { useState, useEffect } from 'react';
import './../../assets/styles/empleados.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [view, setView] = useState('tabla');
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  useEffect(() => {
    // Cargar datos de empleados desde el backend
    fetch('http://localhost:8080/empleados')
      .then((res) => res.json())
      .then((data) => setEmpleados(data))
      .catch((err) => console.error('Error al cargar empleados:', err));
  }, []);

  const handleAddEmpleado = (e) => {
    e.preventDefault();

    const form = e.target;
    const nuevoEmpleado = {
      nombre: form.nombre.value,
      apellido: form.apellido.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      rol: form.rol.value,
    };

    if (empleadoEditando) {
      fetch(`http://localhost:8080/empleados/${empleadoEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEmpleado),
      })
        .then(() => {
          setEmpleados((prevEmpleados) =>
            prevEmpleados.map((empleado) =>
              empleado.id === empleadoEditando.id ? { ...empleado, ...nuevoEmpleado } : empleado
            )
          );
          setEmpleadoEditando(null);
          setView('tabla');
        })
        .catch((err) => console.error('Error al actualizar empleado:', err));
    } else {
      fetch('http://localhost:8080/empleados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoEmpleado),
      })
        .then((res) => res.json())
        .then((data) => {
          setEmpleados([...empleados, data]);
          setView('tabla');
        })
        .catch((err) => console.error('Error al agregar empleado:', err));
    }
  };

  const handleEditEmpleado = (empleado) => {
    setEmpleadoEditando(empleado);
    setView('formulario');
  };

  const handleDeleteEmpleado = (id) => {
    fetch(`http://localhost:8080/empleados/${id}`, {
      method: 'DELETE',
    })
      .then(() => setEmpleados(empleados.filter((empleado) => empleado.id !== id)))
      .catch((err) => console.error('Error al eliminar empleado:', err));
  };

  const renderTabla = () => (
    <>
      <div className="empleados-actions">
        <button className="add-employee-button" onClick={() => setView('formulario')}>
          Agregar Empleado
        </button>
      </div>
      <table className="empleados-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.nombre}</td>
              <td>{empleado.apellido}</td>
              <td>{empleado.correo}</td>
              <td>{empleado.telefono}</td>
              <td>{empleado.rol}</td>
              <td>{new Date(empleado.fechaCreacion).toLocaleDateString()}</td>
              <td className="action-buttons">
                <button className="icon-button" onClick={() => handleEditEmpleado(empleado)}>
                  <FaEdit />
                </button>
                <button className="icon-button" onClick={() => handleDeleteEmpleado(empleado.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  const renderFormulario = () => (
    <form className="empleados-form" onSubmit={handleAddEmpleado}>
      <h2 className="form-title">{empleadoEditando ? 'Editar Empleado' : 'Agregar Empleado'}</h2>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          defaultValue={empleadoEditando?.nombre || ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="apellido"
          placeholder="Apellido"
          defaultValue={empleadoEditando?.apellido || ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="Correo electrónico"
          defaultValue={empleadoEditando?.correo || ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          placeholder="Teléfono"
          defaultValue={empleadoEditando?.telefono || ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="rol">Rol:</label>
        <select id="rol" name="rol" defaultValue={empleadoEditando?.rol || ''} required>
          <option value="" disabled>
            Seleccionar rol
          </option>
          <option value="cajero">Cajero</option>
          <option value="gerente">Gerente</option>
        </select>
      </div>
      <div className="form-buttons">
        <button type="submit" className="form-submit-button">
          {empleadoEditando ? 'Guardar Cambios' : 'Agregar Empleado'}
        </button>
        <button type="button" className="form-cancel-button" onClick={() => setView('tabla')}>
          Cancelar
        </button>
      </div>
    </form>
  );

  return (
    <div className="main-content">
      <h1 className="empleados-title">Gestión de Empleados</h1>
      {view === 'tabla' && renderTabla()}
      {view === 'formulario' && renderFormulario()}
    </div>
  );
};

export default Empleados;