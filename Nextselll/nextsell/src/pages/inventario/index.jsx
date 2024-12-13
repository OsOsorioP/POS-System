import { useState, useEffect } from 'react';
import './../../assets/styles/inventario.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [view, setView] = useState('tabla');
  const [searchTerm, setSearchTerm] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosData, categoriasData, proveedoresData] = await Promise.all([
          fetch('http://localhost:8080/inventarios').then((res) => res.json()),
          fetch('http://localhost:8080/categorias').then((res) => res.json()),
          fetch('http://localhost:8080/proveedores').then((res) => res.json()),
        ]);
        setProductos(productosData);
        setCategorias(categoriasData);
        setProveedores(proveedoresData);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        alert('Hubo un problema al cargar los datos. Intente nuevamente.');
      }
    };
    fetchData();
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();

    const form = e.target;
    const nuevoProducto = {
      nombre: form.nombre.value,
      cantidad: parseInt(form.cantidad.value),
      precio: parseFloat(form.precio.value),
      categoria: form.categoria.value,
      proveedor: form.proveedor.value,
    };

    if (nuevoProducto.cantidad <= 0 || nuevoProducto.precio <= 0) {
      alert('La cantidad y el precio deben ser números positivos.');
      return;
    }

    if (productoEditando) {
      fetch(`http://localhost:8080/inventarios/${productoEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      })
        .then((res) => res.json())
        .then((updatedProduct) => {
          setProductos((prevProductos) =>
            prevProductos.map((producto) =>
              producto.id === productoEditando.id ? updatedProduct : producto
            )
          );
          setProductoEditando(null);
          setView('tabla');
          alert('Producto actualizado correctamente.');
        })
        .catch((err) => {
          console.error('Error al actualizar producto:', err);
          alert('Hubo un problema al actualizar el producto.');
        });
    } else {
      fetch('http://localhost:8080/inventarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto),
      })
        .then((res) => res.json())
        .then((newProduct) => {
          setProductos([...productos, newProduct]);
          setView('tabla');
          alert('Producto agregado correctamente.');
        })
        .catch((err) => {
          console.error('Error al agregar producto:', err);
          alert('Hubo un problema al agregar el producto.');
        });
    }
  };

  const handleEditProduct = (producto) => {
    setProductoEditando(producto);
    setView('formulario');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      fetch(`http://localhost:8080/inventarios/${id}`, { method: 'DELETE' })
        .then(() => {
          setProductos(productos.filter((producto) => producto.id !== id));
          alert('Producto eliminado correctamente.');
        })
        .catch((err) => {
          console.error('Error al eliminar producto:', err);
          alert('Hubo un problema al eliminar el producto.');
        });
    }
  };

  const handleCancel = () => {
    setProductoEditando(null);
    setView('tabla');
  };

  const filteredProductos = productos.filter((producto) =>
    [producto.nombre, producto.categoria, producto.proveedor]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const renderTabla = () => (
    <>
      <div className="inventario-actions">
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-product-button" onClick={() => setView('formulario')}>
          Agregar Producto
        </button>
      </div>
      <table className="inventario-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.length > 0 ? (
            filteredProductos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>{producto.categoria}</td>
                <td>{producto.proveedor}</td>
                <td className="action-buttons">
                  <button className="icon-button" onClick={() => handleEditProduct(producto)}>
                    <FaEdit />
                  </button>
                  <button className="icon-button" onClick={() => handleDeleteProduct(producto.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">
                No se encontraron productos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );

  const renderFormulario = () => (
    <form className="inventario-form" onSubmit={handleAddProduct}>
      <h2 className="form-title">{productoEditando ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre del producto"
          defaultValue={productoEditando?.nombre || ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          placeholder="Cantidad en inventario"
          defaultValue={productoEditando?.cantidad || ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          name="precio"
          placeholder="Precio del producto"
          step="0.01"
          defaultValue={productoEditando?.precio || ''}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoria">Categoría:</label>
        <select id="categoria" name="categoria" defaultValue={productoEditando?.categoria || ''} required>
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="proveedor">Proveedor:</label>
        <select id="proveedor" name="proveedor" defaultValue={productoEditando?.proveedor || ''} required>
          <option value="">Seleccione un proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={proveedor.id}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-buttons">
        <button type="submit" className="form-submit-button">
          {productoEditando ? 'Guardar Cambios' : 'Guardar Producto'}
        </button>
        <button type="button" className="form-cancel-button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );

  return (
    <div className="main-content">
      <h1 className="inventario-title">Gestión de Inventario</h1>
      {view === 'tabla' && renderTabla()}
      {view === 'formulario' && renderFormulario()}
    </div>
  );
};

export default Inventario;
