package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.ProveedorEntidad;
import com.pos.PosSystem.repositorios.ProveedorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorServicio {

    @Autowired
    private ProveedorRepositorio proveedorRepository;

    // Obtener todos los proveedores
    public List<ProveedorEntidad> obtenerTodos() {
        return proveedorRepository.findAll();
    }

    // Obtener proveedor por ID
    public Optional<ProveedorEntidad> obtenerPorId(Integer id) {
        return proveedorRepository.findById(id);
    }

    // Crear nuevo proveedor
    public ProveedorEntidad crearProveedor(ProveedorEntidad proveedor) {
        if (proveedorRepository.existsById(proveedor.getId())) {
            throw new RuntimeException("El ID ya existe");
        }
        return proveedorRepository.save(proveedor);
    }

    // Actualizar proveedor
    public ProveedorEntidad actualizarProveedor(Integer id, ProveedorEntidad proveedorDetalles) {
        ProveedorEntidad proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));

        proveedor.setNombre(proveedorDetalles.getNombre());
        proveedor.setContacto(proveedorDetalles.getContacto());
        proveedor.setTelefono(proveedorDetalles.getTelefono());
        proveedor.setCorreo(proveedorDetalles.getCorreo());
        proveedor.setDireccion(proveedorDetalles.getDireccion());

        return proveedorRepository.save(proveedor);
    }

    // Eliminar proveedor
    public void eliminarProveedor(Integer id) {
        proveedorRepository.deleteById(id);
    }
}
