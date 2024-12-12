package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.InventarioEntidad;
import com.pos.PosSystem.repositorios.InventarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioServicio {

    @Autowired
    private InventarioRepositorio inventarioRepository;

    // Obtener todas las categorías
    public List<InventarioEntidad> obtenerTodos() {
        return inventarioRepository.findAll();
    }

    // Obtener categoría por ID
    public Optional<InventarioEntidad> obtenerPorId(Integer id) {
        return inventarioRepository.findById(id);
    }

    // Crear nueva categoría
    public InventarioEntidad crearInventario(InventarioEntidad inventario) {
        if (inventarioRepository.existsById(inventario.getId())) {
            throw new RuntimeException("El ID ya existe");
        }
        return inventarioRepository.save(inventario);
    }

    // Actualizar categoría
    public InventarioEntidad actualizarInventario(Integer id, InventarioEntidad inventarioDetalles) {
        InventarioEntidad inventario = inventarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        inventario.setProducto(inventarioDetalles.getProducto());
        inventario.setStockActual(inventarioDetalles.getStockActual());
        inventario.setStockMinimo(inventarioDetalles.getStockMinimo());
        inventario.setFechaUltimaReposicion(inventarioDetalles.getFechaUltimaReposicion());
        return inventarioRepository.save(inventario);
    }

    // Eliminar categoría
    public void eliminarInventario(Integer id) {
        inventarioRepository.deleteById(id);
    }
}
