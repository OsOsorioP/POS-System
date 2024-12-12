package com.pos.PosSystem.entidades;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "metodos_pago")
public class MetodoPagoEntidad {

    @Id
    @Column(name = "mp_id", nullable = false, unique = true)
    private Integer id;

    @Column(name = "mp_metodo", length = 20, nullable = false, unique = true)
    private String metodo;
}
