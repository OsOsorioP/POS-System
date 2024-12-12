package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "clientes")
public class ClienteEntidad {

    @Id
    @Column(name = "cli_id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "cli_nombre", length = 50, nullable = false)
    private String nombre;

    @Column(name = "cli_apellido", length = 50, nullable = false)
    private String apellido;

    @Column(name = "cli_correo", length = 50, unique = true)
    private String correo;

    @Column(name = "cli_telefono", length = 15, unique = true)
    private String telefono;

    @Column(name = "cli_puntos_lealtad", nullable = false)
    private Integer puntosLealtad = 0;

    @Column(name = "cli_fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}
