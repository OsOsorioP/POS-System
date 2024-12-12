package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "productos")
public class ProductoEntidad {

    @Id
    @Column(name = "prod_id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "prod_nombre", length = 50, nullable = false)
    private String nombre;

    @Column(name = "prod_descripcion", length = 200)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "prod_cat_id", referencedColumnName = "cat_id", nullable = true)
    private CategoriaEntidad categoria;

    @Column(name = "prod_precio_venta", nullable = false)
    private Double precioVenta;

    @Column(name = "prod_precio_costo", nullable = false)
    private Double precioCosto;

    @Column(name = "prod_nivel_reorden")
    private Integer nivelReorden;

    @ManyToOne
    @JoinColumn(name = "prod_prov_id", referencedColumnName = "prov_id", nullable = true)
    private ProveedorEntidad proveedor;
}
