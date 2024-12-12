package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.MetodoPagoEntidad;
import com.pos.PosSystem.repositorios.MetodoPagoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MetodoPagoServicio {

    @Autowired
    private MetodoPagoRepositorio metodoPagoRepository;

    // Obtener todas las categorías
    public List<MetodoPagoEntidad> obtenerTodos() {
        return metodoPagoRepository.findAll();
    }

    // Obtener categoría por ID
    public Optional<MetodoPagoEntidad> obtenerPorId(Integer id) {
        return metodoPagoRepository.findById(id);
    }

    // Crear nueva categoría
    public MetodoPagoEntidad crearMetodoPago(MetodoPagoEntidad metodoPago) {
        if (metodoPagoRepository.existsById(metodoPago.getId())) {
            throw new RuntimeException("El ID ya existe");
        }
        return metodoPagoRepository.save(metodoPago);
    }

    // Actualizar categoría
    public MetodoPagoEntidad actualizarMetodoPago(Integer id, MetodoPagoEntidad metodoPagoDetalles) {
        MetodoPagoEntidad metodoPago = metodoPagoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        metodoPago.setMetodo(metodoPagoDetalles.getMetodo());
        return metodoPagoRepository.save(metodoPago);
    }

    // Eliminar categoría
    public void eliminarMetodoPago(Integer id) {
        metodoPagoRepository.deleteById(id);
    }
}
