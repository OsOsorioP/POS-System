package com.pos.PosSystem.repositorios;

import com.pos.PosSystem.entidades.MetodoPagoEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetodoPagoRepositorio extends JpaRepository<MetodoPagoEntidad,  Integer> {
}
