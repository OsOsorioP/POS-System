package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.MetodoPagoEntidad;
import com.pos.PosSystem.servicios.MetodoPagoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/metodoPagos")
public class MetodoPagoControlador {

    @Autowired
    private MetodoPagoServicio metodoPagoServicio;

    // Obtener todas las categorías
    @GetMapping
    public List<MetodoPagoEntidad> obtenerTodas() {
        return metodoPagoServicio.obtenerTodos();
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<MetodoPagoEntidad> obtenerPorId(@PathVariable Integer id) {
        Optional<MetodoPagoEntidad> metodoPago = metodoPagoServicio.obtenerPorId(id);
        return metodoPago.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva categoría
    @PostMapping
    public ResponseEntity<MetodoPagoEntidad> crearMetodoPago(@RequestBody MetodoPagoEntidad metodoPago) {
        return ResponseEntity.ok(metodoPagoServicio.crearMetodoPago(metodoPago));
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<MetodoPagoEntidad> actualizarMetodoPago(@PathVariable Integer id, @RequestBody MetodoPagoEntidad metodoPagoDetalles) {
        return ResponseEntity.ok(metodoPagoServicio.actualizarMetodoPago(id, metodoPagoDetalles));
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMetodoPago(@PathVariable Integer id) {
        metodoPagoServicio.eliminarMetodoPago(id);
        return ResponseEntity.noContent().build();
    }
}
