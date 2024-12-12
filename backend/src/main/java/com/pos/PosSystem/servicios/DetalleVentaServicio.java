package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.DetalleVentaEntidad;
import com.pos.PosSystem.repositorios.DetalleVentaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetalleVentaServicio {

    @Autowired
    private DetalleVentaRepositorio detalleVentaRepository;

    // Obtener todas las categorías
    public List<DetalleVentaEntidad> obtenerTodos() {
        return detalleVentaRepository.findAll();
    }

    // Obtener categoría por ID
    public Optional<DetalleVentaEntidad> obtenerPorId(Integer id) {
        return detalleVentaRepository.findById(id);
    }

    // Crear nueva categoría
    public DetalleVentaEntidad crearDetalleVenta(DetalleVentaEntidad detalleVenta) {
        if (detalleVentaRepository.existsById(detalleVenta.getId())) {
            throw new RuntimeException("El ID ya existe");
        }
        return detalleVentaRepository.save(detalleVenta);
    }

    // Actualizar categoría
    public DetalleVentaEntidad actualizarDetalleVenta(Integer id, DetalleVentaEntidad detalleVentaDetalles) {
        DetalleVentaEntidad detalleVenta = detalleVentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        detalleVenta.setTransaccion(detalleVentaDetalles.getTransaccion());
        detalleVenta.setProducto(detalleVentaDetalles.getProducto());
        detalleVenta.setCantidad(detalleVentaDetalles.getCantidad());
        detalleVenta.setPrecioUnidad(detalleVentaDetalles.getPrecioUnidad());
        return detalleVentaRepository.save(detalleVenta);
    }

    // Eliminar categoría
    public void eliminarDetalleVenta(Integer id) {
        detalleVentaRepository.deleteById(id);
    }
}
