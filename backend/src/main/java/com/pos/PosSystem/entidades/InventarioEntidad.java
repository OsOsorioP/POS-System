package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "inventario")
public class InventarioEntidad {

    @Id
    @Column(name = "inv_id", nullable = false, unique = true)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "inv_prod_id", referencedColumnName = "prod_id", nullable = false, unique = true)
    private ProductoEntidad producto;

    @Column(name = "inv_stock_actual", nullable = false)
    private Integer stockActual;

    @Column(name = "inv_stock_minimo", nullable = false)
    private Integer stockMinimo;

    @Column(name = "inv_fecha_ultima_reposicion")
    private LocalDateTime fechaUltimaReposicion;
}
