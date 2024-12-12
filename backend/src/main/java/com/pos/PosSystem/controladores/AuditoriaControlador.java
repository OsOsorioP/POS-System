package com.pos.PosSystem.controladores;

import com.pos.PosSystem.entidades.AuditoriaEntidad;
import com.pos.PosSystem.servicios.AuditoriaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditorias")
public class AuditoriaControlador {

    @Autowired
    private AuditoriaServicio auditoriaServicio;

    // Obtener todas las categorías
    @GetMapping
    public List<AuditoriaEntidad> obtenerTodas() {
        return auditoriaServicio.obtenerTodas();
    }

    // Crear nueva categoría
    //@PostMapping
    //public ResponseEntity<AuditoriaEntidad> crearAuditoria(@RequestBody AuditoriaEntidad auditoria) {
      //  return ResponseEntity.ok(auditoriaServicio.crearAuditoria(auditoria));
    //}

}
