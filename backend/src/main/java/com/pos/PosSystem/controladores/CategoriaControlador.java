package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.CategoriaEntidad;
import com.pos.PosSystem.servicios.CategoriaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categorias")
public class CategoriaControlador {

    @Autowired
    private CategoriaServicio categoriaServicio;

    // Obtener todas las categorías
    @GetMapping
    public List<CategoriaEntidad> obtenerTodas() {
        return categoriaServicio.obtenerTodos();
    }

    // Obtener categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaEntidad> obtenerPorId(@PathVariable Integer id) {
        Optional<CategoriaEntidad> categoria = categoriaServicio.obtenerPorId(id);
        return categoria.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear nueva categoría
    @PostMapping
    public ResponseEntity<CategoriaEntidad> crearCategoria(@RequestBody CategoriaEntidad categoria) {
        return ResponseEntity.ok(categoriaServicio.crearCategoria(categoria));
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<CategoriaEntidad> actualizarCategoria(@PathVariable Integer id, @RequestBody CategoriaEntidad categoriaDetalles) {
        return ResponseEntity.ok(categoriaServicio.actualizarCategoria(id, categoriaDetalles));
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Integer id) {
        categoriaServicio.eliminarCategoria(id);
        return ResponseEntity.noContent().build();
    }
}
