package com.pos.PosSystem.servicios;

import com.pos.PosSystem.entidades.AuditoriaEntidad;
import com.pos.PosSystem.repositorios.AuditoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditoriaServicio {

    @Autowired
    private AuditoriaRepositorio auditoriaRepository;

    // Obtener todas las auditorías
    public List<AuditoriaEntidad> obtenerTodas() {
        return auditoriaRepository.findAll();
    }

}
