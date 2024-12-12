package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categorias")
public class CategoriaEntidad {

    @Id
    @Column(name = "cat_id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "cat_nombre", length = 50, nullable = false, unique = true)
    private String nombre;
}
