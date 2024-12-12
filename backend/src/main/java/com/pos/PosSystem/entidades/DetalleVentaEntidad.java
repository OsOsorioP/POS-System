package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "detalles_venta")
public class DetalleVentaEntidad {

    @Id
    @Column(name = "det_venta_id", nullable = false, unique = true)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "det_trans_id", referencedColumnName = "trans_id", nullable = false)
    private TransaccionVentaEntidad transaccion;

    @ManyToOne
    @JoinColumn(name = "det_prod_id", referencedColumnName = "prod_id", nullable = false)
    private ProductoEntidad producto;

    @Column(name = "det_cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "det_precio_unidad", nullable = false)
    private Double precioUnidad;
}
