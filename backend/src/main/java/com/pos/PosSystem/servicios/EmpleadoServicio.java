package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.EmpleadoEntidad;
import com.pos.PosSystem.repositorios.EmpleadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoServicio {

    @Autowired
    private EmpleadoRepositorio empleadoRepository;

    // Obtener todas las categorías
    public List<EmpleadoEntidad> obtenerTodos() {
        return empleadoRepository.findAll();
    }

    // Obtener categoría por ID
    public Optional<EmpleadoEntidad> obtenerPorId(Integer id) {
        return empleadoRepository.findById(id);
    }

    // Crear nueva categoría
    public EmpleadoEntidad crearEmpleado(EmpleadoEntidad empleado) {
        if (empleadoRepository.existsById(empleado.getId())) {
            throw new RuntimeException("El ID ya existe");
        }
        return empleadoRepository.save(empleado);
    }

    // Actualizar categoría
    public EmpleadoEntidad actualizarEmpleado(Integer id, EmpleadoEntidad empleadoDetalles) {
        EmpleadoEntidad empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        empleado.setNombre(empleadoDetalles.getNombre());
        empleado.setApellido(empleadoDetalles.getApellido());
        empleado.setCorreo(empleadoDetalles.getCorreo());
        empleado.setRol(empleadoDetalles.getRol());
        empleado.setTelefono(empleadoDetalles.getTelefono());
        empleado.setFechaCreacion(empleadoDetalles.getFechaCreacion());
        return empleadoRepository.save(empleado);
    }

    // Eliminar categoría
    public void eliminarEmpleado(Integer id) {
        empleadoRepository.deleteById(id);
    }
}
