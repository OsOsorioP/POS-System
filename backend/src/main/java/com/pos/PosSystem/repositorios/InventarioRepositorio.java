package com.pos.PosSystem.repositorios;

import com.pos.PosSystem.entidades.InventarioEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioRepositorio extends JpaRepository<InventarioEntidad,  Integer> {
}
