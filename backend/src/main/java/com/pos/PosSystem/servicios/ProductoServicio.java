package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.ProductoEntidad;
import com.pos.PosSystem.repositorios.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServicio {

    @Autowired
    private ProductoRepositorio productoRepository;

    // Obtener todos los productos
    public List<ProductoEntidad> obtenerTodos() {
        return productoRepository.findAll();
    }

    // Obtener producto por ID
    public Optional<ProductoEntidad> obtenerPorId(Integer id) {
        return productoRepository.findById(id);
    }

    // Crear nuevo producto
    public ProductoEntidad crearProducto(ProductoEntidad producto) {
        if (productoRepository.existsById(producto.getId())) {
            throw new RuntimeException("El ID ya existe");
        }
        return productoRepository.save(producto);
    }

    // Actualizar producto
    public ProductoEntidad actualizarProducto(Integer id, ProductoEntidad productoDetalles) {
        ProductoEntidad producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setNombre(productoDetalles.getNombre());
        producto.setDescripcion(productoDetalles.getDescripcion());
        producto.setPrecioVenta(productoDetalles.getPrecioVenta());
        producto.setPrecioCosto(productoDetalles.getPrecioCosto());
        producto.setNivelReorden(productoDetalles.getNivelReorden());
        producto.setCategoria(productoDetalles.getCategoria());
        producto.setProveedor(productoDetalles.getProveedor());

        return productoRepository.save(producto);
    }

    // Eliminar producto
    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id);
    }
}
