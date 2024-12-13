import { useState, useEffect } from 'react';
import './../../assets/styles/clientes.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Clientes = () => {
  const [clientes, setClientes] = useState([]); // Clientes cargados desde el backend
  const [view, setView] = useState('tabla'); // Controla la vista actual
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    // Cargar clientes desde el backend
    fetch('http://localhost:8080/clientes')
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error('Error al cargar clientes:', err));
  }, []);

  const handleAddCliente = (e) => {
    e.preventDefault();

    const form = e.target;
    const nuevoCliente = {
      nombre: form.nombre.value,
      apellido: form.apellido.value,
      telefono: form.telefono.value,
      correo: form.correo.value,
      puntos: parseInt(form.puntos.value),
    };

    if (clienteEditando) {
      // Actualizar cliente existente
      fetch(`http://localhost:8080/clientes/${clienteEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente),
      })
        .then(() => {
          setClientes((prevClientes) =>
            prevClientes.map((cliente) =>
              cliente.id === clienteEditando.id ? { ...cliente, ...nuevoCliente } : cliente
            )
          );
          setClienteEditando(null);
          setView('tabla');
        })
        .catch((err) => console.error('Error al actualizar cliente:', err));
    } else {
      // Crear un nuevo cliente
      fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientes([...clientes, data]);
          setView('tabla');
        })
        .catch((err) => console.error('Error al crear cliente:', err));
    }
  };

  const handleEditCliente = (cliente) => {
    setClienteEditando(cliente);
    setView('formulario');
  };

  const handleDeleteCliente = (id) => {
    fetch(`http://localhost:8080/clientes/${id}`, {
      method: 'DELETE',
    })
      .then(() => setClientes(clientes.filter((cliente) => cliente.id !== id)))
      .catch((err) => console.error('Error al eliminar cliente:', err));
  };

  const handleCancel = () => {
    setClienteEditando(null);
    setView('tabla');
  };

  const renderTabla = () => (
    <>
      <div className="clientes-actions">
        <button className="add-client-button" onClick={() => setView('formulario')}>
          Crear Cliente
        </button>
      </div>
      <table className="clientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Puntos de Lealtad</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.puntos}</td>
              <td>{new Date(cliente.fechaCreacion).toLocaleDateString()}</td>
              <td className="action-buttons">
                <button className="icon-button" onClick={() => handleEditCliente(cliente)}>
                  <FaEdit />
                </button>
                <button className="icon-button" onClick={() => handleDeleteCliente(cliente.id)}>
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
    <form className="clientes-form" onSubmit={handleAddCliente}>
      <h2 className="form-title">{clienteEditando ? 'Editar Cliente' : 'Crear Cliente'}</h2>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          defaultValue={clienteEditando?.nombre || ''}
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
          defaultValue={clienteEditando?.apellido || ''}
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
          defaultValue={clienteEditando?.telefono || ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="correo">Correo:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="Correo"
          defaultValue={clienteEditando?.correo || ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="puntos">Puntos de Lealtad:</label>
        <input
          type="number"
          id="puntos"
          name="puntos"
          placeholder="Puntos"
          defaultValue={clienteEditando?.puntos || ''}
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit" className="form-submit-button">
          {clienteEditando ? 'Guardar Cambios' : 'Crear Cliente'}
        </button>
        <button type="button" className="form-cancel-button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );

  return (
    <div className="main-content">
      <h1 className="clientes-title">Gestión de Clientes</h1>
      {view === 'tabla' && renderTabla()}
      {view === 'formulario' && renderFormulario()}
    </div>
  );
};

export default Clientes;
