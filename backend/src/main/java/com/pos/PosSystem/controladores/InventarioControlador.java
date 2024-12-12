package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.InventarioEntidad;
import com.pos.PosSystem.servicios.InventarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inventarios")
public class InventarioControlador {

    @Autowired
    private InventarioServicio inventarioServicio;

    // Obtener todos los inventarios
    @GetMapping
    public List<InventarioEntidad> obtenerTodos() {
        return inventarioServicio.obtenerTodos();
    }

    // Obtener inventario por ID
    @GetMapping("/{id}")
    public ResponseEntity<InventarioEntidad> obtenerPorId(@PathVariable Integer id) {
        Optional<InventarioEntidad> inventario = inventarioServicio.obtenerPorId(id);
        return inventario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nuevo inventario
    @PostMapping
    public ResponseEntity<InventarioEntidad> crearInventario(@RequestBody InventarioEntidad inventario) {
        return ResponseEntity.ok(inventarioServicio.crearInventario(inventario));
    }

    // Actualizar inventario
    @PutMapping("/{id}")
    public ResponseEntity<InventarioEntidad> actualizarInventario(@PathVariable Integer id, @RequestBody InventarioEntidad inventarioDetalles) {
        return ResponseEntity.ok(inventarioServicio.actualizarInventario(id, inventarioDetalles));
    }

    // Eliminar inventario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarInventario(@PathVariable Integer id) {
        inventarioServicio.eliminarInventario(id);
        return ResponseEntity.noContent().build();
    }
}
