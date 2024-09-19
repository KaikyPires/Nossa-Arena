package br.com.criandoapi.projeto.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "agenda")
public class Agenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dia", nullable = false)
    private LocalDate dia;

    @Column(name = "hora", nullable = false)
    private LocalTime hora;

    @Column(name = "statusAgendamento", nullable = false)  // Corrigido para o nome da coluna e tipo booleano
    private Boolean statusAgendamento = true;  // TRUE = Disponível, FALSE = Reservado

    @ManyToOne
    @JoinColumn(name = "partida_id", nullable = true)  // Chave estrangeira que pode ser nula
    private Partida partida;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDia() {
        return dia;
    }

    public void setDia(LocalDate dia) {
        this.dia = dia;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public Boolean getStatusAgendamento() {
        return statusAgendamento;
    }

    public void setStatusAgendamento(Boolean statusAgendamento) {
        this.statusAgendamento = statusAgendamento;
    }

    public Partida getPartida() {
        return partida;
    }

    public void setPartida(Partida partida) {
        this.partida = partida;
    }
}
