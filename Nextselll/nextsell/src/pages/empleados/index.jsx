import { useState, useEffect } from 'react';
import './../../assets/styles/empleados.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [roles, setRoles] = useState([]);
  const [view, setView] = useState('tabla');
  const [empleadoEditando, setEmpleadoEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar empleados desde el backend
    setLoading(true);
    fetch('http://localhost:8080/empleados')
      .then((res) => res.json())
      .then((data) => setEmpleados(data))
      .catch((err) => console.error('Error al cargar empleados:', err))
      .finally(() => setLoading(false));

    // Cargar roles desde el backend
    fetch('http://localhost:8080/roles')
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error('Error al cargar roles:', err));
  }, []);

  const handleAddEmpleado = (e) => {
    e.preventDefault();
    setError(null);

    const form = e.target;
    const nuevoEmpleado = {
      nombre: form.nombre.value,
      apellido: form.apellido.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      rol: form.rol.value,
    };

    const url = empleadoEditando
      ? `http://localhost:8080/empleados/${empleadoEditando.id}`
      : 'http://localhost:8080/empleados';

    const method = empleadoEditando ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEmpleado),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al guardar los datos del empleado');
        return res.json();
      })
      .then((data) => {
        if (empleadoEditando) {
          setEmpleados((prev) =>
            prev.map((emp) => (emp.id === empleadoEditando.id ? { ...emp, ...nuevoEmpleado } : emp))
          );
          setEmpleadoEditando(null);
        } else {
          setEmpleados((prev) => [...prev, data]);
        }
        setView('tabla');
      })
      .catch((err) => setError(err.message));
  };

  const handleEditEmpleado = (empleado) => {
    setEmpleadoEditando(empleado);
    setView('formulario');
  };

  const handleDeleteEmpleado = (id) => {
    fetch(`http://localhost:8080/empleados/${id}`, {
      method: 'DELETE',
    })
      .then(() => setEmpleados((prev) => prev.filter((empleado) => empleado.id !== id)))
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
      {error && <p className="form-error">Error: {error}</p>}
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
          {roles.map((rol) => (
            <option key={rol.id} value={rol.nombre}>
              {rol.nombre}
            </option>
          ))}
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
      {loading ? (
        <p>Cargando empleados...</p>
      ) : view === 'tabla' ? (
        renderTabla()
      ) : (
        renderFormulario()
      )}
    </div>
  );
};

export default Empleados;
