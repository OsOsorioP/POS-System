package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.EmpleadoEntidad;
import com.pos.PosSystem.servicios.EmpleadoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empleados")
public class EmpleadoControlador {

    @Autowired
    private EmpleadoServicio empleadoServicio;

    // Obtener todas las categorías
    @GetMapping
    public List<EmpleadoEntidad> obtenerTodas() {
        return empleadoServicio.obtenerTodos();
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<EmpleadoEntidad> obtenerPorId(@PathVariable Integer id) {
        Optional<EmpleadoEntidad> empleado = empleadoServicio.obtenerPorId(id);
        return empleado.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva categoría
    @PostMapping
    public ResponseEntity<EmpleadoEntidad> crearEmpleado(@RequestBody EmpleadoEntidad empleado) {
        return ResponseEntity.ok(empleadoServicio.crearEmpleado(empleado));
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<EmpleadoEntidad> actualizarEmpleado(@PathVariable Integer id, @RequestBody EmpleadoEntidad empleadoDetalles) {
        return ResponseEntity.ok(empleadoServicio.actualizarEmpleado(id, empleadoDetalles));
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEmpleado(@PathVariable Integer id) {
        empleadoServicio.eliminarEmpleado(id);
        return ResponseEntity.noContent().build();
    }
}
