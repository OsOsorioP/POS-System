package com.pos.PosSystem.repositorios;

import com.pos.PosSystem.entidades.TransaccionVentaEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransaccionVentaRepositorio extends JpaRepository<TransaccionVentaEntidad,  Integer> {
}
