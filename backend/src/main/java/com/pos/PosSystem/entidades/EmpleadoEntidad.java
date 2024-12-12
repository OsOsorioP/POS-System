package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "empleados")
public class EmpleadoEntidad {

    @Id
    @Column(name = "emp_id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "emp_nombre", length = 50, nullable = false)
    private String nombre;

    @Column(name = "emp_apellido", length = 50, nullable = false)
    private String apellido;

    @Column(name = "emp_correo", length = 50, nullable = false, unique = true)
    private String correo;

    @Column(name = "emp_rol", length = 20)
    private String rol;

    @Column(name = "emp_telefono", length = 15)
    private String telefono;

    @Column(name = "emp_fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}
