package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.ProductoEntidad;
import com.pos.PosSystem.servicios.ProductoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/productos")
public class ProductoControlador {

    @Autowired
    private ProductoServicio productoServicio;

    // Obtener todas las categorías
    @GetMapping
    public List<ProductoEntidad> obtenerTodas() {
        return productoServicio.obtenerTodos();
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductoEntidad> obtenerPorId(@PathVariable Integer id) {
        Optional<ProductoEntidad> producto = productoServicio.obtenerPorId(id);
        return producto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva categoría
    @PostMapping
    public ResponseEntity<ProductoEntidad> crearProducto(@RequestBody ProductoEntidad producto) {
        return ResponseEntity.ok(productoServicio.crearProducto(producto));
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<ProductoEntidad> actualizarProducto(@PathVariable Integer id, @RequestBody ProductoEntidad productoDetalles) {
        return ResponseEntity.ok(productoServicio.actualizarProducto(id, productoDetalles));
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer id) {
        productoServicio.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}

