package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.TransaccionVentaEntidad;
import com.pos.PosSystem.repositorios.TransaccionVentaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransaccionVentaServicio {

    @Autowired
    private TransaccionVentaRepositorio transaccionVentaRepository;

    // Obtener todas las categorías
    public List<TransaccionVentaEntidad> obtenerTodos() {
        return transaccionVentaRepository.findAll();
    }

    // Obtener categoría por ID
    public Optional<TransaccionVentaEntidad> obtenerPorId(Integer id) {
        return transaccionVentaRepository.findById(id);
    }

    // Crear nueva categoría
    public TransaccionVentaEntidad crearTransaccionVenta(TransaccionVentaEntidad transaccionVenta) {
        return transaccionVentaRepository.save(transaccionVenta);
    }

    // Actualizar categoría
    public TransaccionVentaEntidad actualizarTransaccionVenta(Integer id, TransaccionVentaEntidad transaccionVentaDetalles) {
        TransaccionVentaEntidad transaccionVenta = transaccionVentaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        transaccionVenta.setFecha(transaccionVentaDetalles.getFecha());
        transaccionVenta.setMontoTotal(transaccionVentaDetalles.getMontoTotal());
        transaccionVenta.setMetodoPago(transaccionVentaDetalles.getMetodoPago());
        transaccionVenta.setEmpleado(transaccionVentaDetalles.getEmpleado());
        transaccionVenta.setCliente(transaccionVentaDetalles.getCliente());
        return transaccionVentaRepository.save(transaccionVenta);
    }

    // Eliminar categoría
    public void eliminarTransaccionVenta(Integer id) {
        transaccionVentaRepository.deleteById(id);
    }
}
