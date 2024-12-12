package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.ClienteEntidad;
import com.pos.PosSystem.servicios.ClienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteControlador {

    @Autowired
    private ClienteServicio clienteServicio;

    // Obtener todas las categorías
    @GetMapping
    public List<ClienteEntidad> obtenerTodas() {
        return clienteServicio.obtenerTodos();
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<ClienteEntidad> obtenerPorId(@PathVariable Integer id) {
        Optional<ClienteEntidad> cliente = clienteServicio.obtenerPorId(id);
        return cliente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva categoría
    @PostMapping
    public ResponseEntity<ClienteEntidad> crearCliente(@RequestBody ClienteEntidad cliente) {
        return ResponseEntity.ok(clienteServicio.crearCliente(cliente));
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<ClienteEntidad> actualizarCliente(@PathVariable Integer id, @RequestBody ClienteEntidad clienteDetalles) {
        return ResponseEntity.ok(clienteServicio.actualizarCliente(id, clienteDetalles));
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable Integer id) {
        clienteServicio.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }
}
