package com.pos.PosSystem.repositorios;

import com.pos.PosSystem.entidades.DetalleVentaEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleVentaRepositorio extends JpaRepository<DetalleVentaEntidad,  Integer> {
}
