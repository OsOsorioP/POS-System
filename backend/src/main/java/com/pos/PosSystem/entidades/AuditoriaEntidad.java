package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "auditoria")
public class AuditoriaEntidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // ID se genera automáticamente
    @Column(name = "aud_id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "aud_tabla", length = 50, nullable = false)
    private String tabla;

    @Column(name = "aud_operacion", length = 10, nullable = false)
    private String operacion;

    @Column(name = "aud_fecha", nullable = false)
    private LocalDateTime fecha;  // El valor de fecha será asignado en el método @PrePersist

    @ManyToOne
    @JoinColumn(name = "aud_emp_id", referencedColumnName = "emp_id", nullable = true)
    private EmpleadoEntidad empleado;

    @Column(name = "aud_datos_antiguos", columnDefinition = "TEXT")
    private String datosAntiguos;

    @Column(name = "aud_datos_nuevos", columnDefinition = "TEXT")
    private String datosNuevos;

    // Método para asignar la fecha de auditoría antes de la persistencia
    @PrePersist
    public void asignarFecha() {
        if (fecha == null) {  // Si la fecha es null, asigna la fecha y hora actuales
            fecha = LocalDateTime.now();
        }
    }
}
