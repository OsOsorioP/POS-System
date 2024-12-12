package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.ClienteEntidad;
import com.pos.PosSystem.repositorios.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServicio {

    @Autowired
    private ClienteRepositorio clienteRepository;

    // Obtener todos los clientes
    public List<ClienteEntidad> obtenerTodos() {
        return clienteRepository.findAll();
    }

    // Obtener cliente por ID
    public Optional<ClienteEntidad> obtenerPorId(Integer id) {
        return clienteRepository.findById(id);
    }

    // Crear nuevo cliente
    public ClienteEntidad crearCliente(ClienteEntidad cliente) {
        return clienteRepository.save(cliente);
    }

    // Actualizar cliente
    public ClienteEntidad actualizarCliente(Integer id, ClienteEntidad clienteDetalles) {
        ClienteEntidad cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        cliente.setNombre(clienteDetalles.getNombre());
        cliente.setApellido(clienteDetalles.getApellido());
        cliente.setCorreo(clienteDetalles.getCorreo());
        cliente.setTelefono(clienteDetalles.getTelefono());
        cliente.setPuntosLealtad(clienteDetalles.getPuntosLealtad());

        return clienteRepository.save(cliente);
    }

    // Eliminar cliente
    public void eliminarCliente(Integer id) {
        clienteRepository.deleteById(id);
    }
}
