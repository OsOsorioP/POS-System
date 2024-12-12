package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.ProveedorEntidad;
import com.pos.PosSystem.servicios.ProveedorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/proveedores")
public class ProveedorControlador {

    @Autowired
    private ProveedorServicio proveedorServicio;

    // Obtener todas las categorías
    @GetMapping
    public List<ProveedorEntidad> obtenerTodas() {
        return proveedorServicio.obtenerTodos();
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<ProveedorEntidad> obtenerPorId(@PathVariable Integer id) {
        Optional<ProveedorEntidad> proveedor = proveedorServicio.obtenerPorId(id);
        return proveedor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva categoría
    @PostMapping
    public ResponseEntity<ProveedorEntidad> crearProveedor(@RequestBody ProveedorEntidad proveedor) {
        return ResponseEntity.ok(proveedorServicio.crearProveedor(proveedor));
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<ProveedorEntidad> actualizarProveedor(@PathVariable Integer id, @RequestBody ProveedorEntidad proveedorDetalles) {
        return ResponseEntity.ok(proveedorServicio.actualizarProveedor(id, proveedorDetalles));
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProveedor(@PathVariable Integer id) {
        proveedorServicio.eliminarProveedor(id);
        return ResponseEntity.noContent().build();
    }
}
