package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transacciones_venta")
public class TransaccionVentaEntidad {

    @Id
    @Column(name = "trans_id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "trans_fecha", nullable = false)
    private LocalDateTime fecha = LocalDateTime.now();

    @Column(name = "trans_monto_total", nullable = false)
    private Double montoTotal;

    @ManyToOne
    @JoinColumn(name = "trans_metodo_pago_id", referencedColumnName = "mp_id", nullable = false)
    private MetodoPagoEntidad metodoPago;

    @ManyToOne
    @JoinColumn(name = "trans_emp_id", referencedColumnName = "emp_id", nullable = true)
    private EmpleadoEntidad empleado;

    @ManyToOne
    @JoinColumn(name = "trans_cli_id", referencedColumnName = "cli_id", nullable = true)
    private ClienteEntidad cliente;
}
