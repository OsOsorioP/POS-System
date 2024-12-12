package com.pos.PosSystem.repositorios;

import com.pos.PosSystem.entidades.EmpleadoEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepositorio extends JpaRepository <EmpleadoEntidad, Integer> {
}
