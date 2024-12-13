import { useState } from 'react';
import './../../assets/styles/clientes.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Clientes = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '123456789', correo: 'juan.perez@gmail.com', puntos: 120, fechaCreacion: '2024-12-01' },
    { id: 2, nombre: 'Ana', apellido: 'López', telefono: '987654321', correo: 'ana.lopez@gmail.com', puntos: 200, fechaCreacion: '2024-12-05' },
  ]);
  const [view, setView] = useState('tabla'); // Controla la vista actual
  const [clienteEditando, setClienteEditando] = useState(null);

  const handleAddCliente = (e) => {
    e.preventDefault();

    const form = e.target;
    const nuevoCliente = {
      id: clienteEditando ? clienteEditando.id : clientes.length + 1,
      nombre: form.nombre.value,
      apellido: form.apellido.value,
      telefono: form.telefono.value,
      correo: form.correo.value,
      puntos: parseInt(form.puntos.value),
      fechaCreacion: clienteEditando ? clienteEditando.fechaCreacion : new Date().toISOString().split('T')[0],
    };

    if (clienteEditando) {
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id === clienteEditando.id ? nuevoCliente : cliente
        )
      );
      setClienteEditando(null);
    } else {
      setClientes([...clientes, nuevoCliente]);
    }

    setView('tabla');
  };

  const handleEditCliente = (cliente) => {
    setClienteEditando(cliente);
    setView('formulario');
  };

  const handleDeleteCliente = (id) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
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
              <td>{cliente.fechaCreacion}</td>
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
