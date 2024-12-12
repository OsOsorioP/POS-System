package com.pos.PosSystem.repositorios;

import com.pos.PosSystem.entidades.AuditoriaEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditoriaRepositorio extends JpaRepository<AuditoriaEntidad, Integer> {
}
