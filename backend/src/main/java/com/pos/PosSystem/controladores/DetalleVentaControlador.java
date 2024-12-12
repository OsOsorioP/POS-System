package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.DetalleVentaEntidad;
import com.pos.PosSystem.servicios.DetalleVentaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/detalleVentas")
public class DetalleVentaControlador {

    @Autowired
    private DetalleVentaServicio detalleVentaServicio;

    // Obtener todas las categorías
    @GetMapping
    public List<DetalleVentaEntidad> obtenerTodas() {
        return detalleVentaServicio.obtenerTodos();
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<DetalleVentaEntidad> obtenerPorId(@PathVariable Integer id) {
        Optional<DetalleVentaEntidad> detalleVenta = detalleVentaServicio.obtenerPorId(id);
        return detalleVenta.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva categoría
    @PostMapping
    public ResponseEntity<DetalleVentaEntidad> crearDetalleVenta(@RequestBody DetalleVentaEntidad detalleVenta) {
        return ResponseEntity.ok(detalleVentaServicio.crearDetalleVenta(detalleVenta));
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<DetalleVentaEntidad> actualizarDetalleVenta(@PathVariable Integer id, @RequestBody DetalleVentaEntidad detalleVentaDetalles) {
        return ResponseEntity.ok(detalleVentaServicio.actualizarDetalleVenta(id, detalleVentaDetalles));
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDetalleVenta(@PathVariable Integer id) {
        detalleVentaServicio.eliminarDetalleVenta(id);
        return ResponseEntity.noContent().build();
    }
}
