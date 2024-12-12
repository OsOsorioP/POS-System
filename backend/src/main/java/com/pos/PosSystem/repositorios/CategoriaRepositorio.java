package com.pos.PosSystem.repositorios;

import com.pos.PosSystem.entidades.CategoriaEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepositorio extends JpaRepository<CategoriaEntidad,  Integer> {
}
