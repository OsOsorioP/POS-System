// Recuperamos los productos del localStorage, si existen
const obtenerProductosDelStorage = () => {
    const productosStorage = localStorage.getItem('productos');
    return productosStorage ? JSON.parse(productosStorage) : [];  // Si no existen, devolvemos un array vacío
  };
  
  let productos = obtenerProductosDelStorage();
  
  // Guardar los productos en localStorage
  const guardarProductosEnStorage = () => {
    localStorage.setItem('productos', JSON.stringify(productos));
  };
  
  // Obtener todos los productos
  export const obtenerProductos = () => {
    return productos;
  };
  
  // Agregar un nuevo producto
  export const agregarProducto = (producto) => {
    const nuevoProducto = { ...producto, id: productos.length + 1 };  // Asignamos un ID único
    productos.push(nuevoProducto);
    guardarProductosEnStorage();  // Guardamos los productos actualizados
  };
  
  // Editar un producto existente
  export const editarProducto = (productoActualizado) => {
    const index = productos.findIndex((producto) => producto.id === productoActualizado.id);
    if (index !== -1) {
      productos[index] = productoActualizado;
      guardarProductosEnStorage();  // Guardamos los productos actualizados
    }
  };
  
  // Eliminar un producto
  export const eliminarProducto = (id) => {
    productos = productos.filter((producto) => producto.id !== id);
    guardarProductosEnStorage();  // Guardamos los productos actualizados
  };
  