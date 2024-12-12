package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.CategoriaEntidad;
import com.pos.PosSystem.repositorios.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaServicio {

    @Autowired
    private CategoriaRepositorio categoriaRepository;

    // Obtener todas las categorías
    public List<CategoriaEntidad> obtenerTodos() {
        return categoriaRepository.findAll();
    }

    // Obtener categoría por ID
    public Optional<CategoriaEntidad> obtenerPorId(Integer id) {
        return categoriaRepository.findById(id);
    }

    // Crear nueva categoría
    public CategoriaEntidad crearCategoria(CategoriaEntidad categoria) {
        if (categoriaRepository.existsById(categoria.getId())) {
            throw new RuntimeException("El ID ya existe");
        }
        return categoriaRepository.save(categoria);
    }

    // Actualizar categoría
    public CategoriaEntidad actualizarCategoria(Integer id, CategoriaEntidad categoriaDetalles) {
        CategoriaEntidad categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        categoria.setNombre(categoriaDetalles.getNombre());
        return categoriaRepository.save(categoria);
    }

    // Eliminar categoría
    public void eliminarCategoria(Integer id) {
        categoriaRepository.deleteById(id);
    }
}
