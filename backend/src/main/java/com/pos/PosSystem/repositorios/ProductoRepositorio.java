package com.pos.PosSystem.repositorios;

import com.pos.PosSystem.entidades.ProductoEntidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepositorio extends JpaRepository<ProductoEntidad,  Integer> {
}
