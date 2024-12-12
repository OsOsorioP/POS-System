package com.pos.PosSystem.repositorios;

import com.pos.PosSystem.entidades.ProveedorEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepositorio extends JpaRepository<ProveedorEntidad,  Integer> {
}
