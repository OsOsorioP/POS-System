package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.TransaccionVentaEntidad;
import com.pos.PosSystem.servicios.TransaccionVentaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transaccionVentas")
public class TransaccionVentaControlador {

    @Autowired
    private TransaccionVentaServicio transaccionVentaServicio;

    // Obtener todas las categorías
    @GetMapping
    public List<TransaccionVentaEntidad> obtenerTodas() {
        return transaccionVentaServicio.obtenerTodos();
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<TransaccionVentaEntidad> obtenerPorId(@PathVariable Integer id) {
        Optional<TransaccionVentaEntidad> transaccionVenta = transaccionVentaServicio.obtenerPorId(id);
        return transaccionVenta.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva categoría
    @PostMapping
    public ResponseEntity<TransaccionVentaEntidad> crearTransaccionVenta(@RequestBody TransaccionVentaEntidad transaccionVenta) {
        return ResponseEntity.ok(transaccionVentaServicio.crearTransaccionVenta(transaccionVenta));
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<TransaccionVentaEntidad> actualizarTransaccionVenta(@PathVariable Integer id, @RequestBody TransaccionVentaEntidad transaccionVentaDetalles) {
        return ResponseEntity.ok(transaccionVentaServicio.actualizarTransaccionVenta(id, transaccionVentaDetalles));
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTransaccionVenta(@PathVariable Integer id) {
        transaccionVentaServicio.eliminarTransaccionVenta(id);
        return ResponseEntity.noContent().build();
    }
}
