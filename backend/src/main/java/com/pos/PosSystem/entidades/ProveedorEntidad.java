package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "proveedores")
public class ProveedorEntidad {

    @Id
    @Column(name = "prov_id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "prov_nombre", length = 50, nullable = false, unique = true)
    private String nombre;

    @Column(name = "prov_contacto", length = 50)
    private String contacto;

    @Column(name = "prov_telefono", length = 15, unique = true)
    private String telefono;

    @Column(name = "prov_correo", length = 50, unique = true)
    private String correo;

    @Column(name = "prov_direccion", length = 100)
    private String direccion;
}
