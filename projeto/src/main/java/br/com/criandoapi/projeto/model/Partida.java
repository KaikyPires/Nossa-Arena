package br.com.criandoapi.projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "partida")
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cpf", nullable = true, length = 11)
    private String cpfUser;

    @Column(name = "dia") // Mapeamento para a coluna "dia"
    private LocalDate dataPartida;

    @Column(name = "hora") // Mapeamento para a coluna "hora"
    private LocalTime horario;

    @Column(name = "status_pagamento") // Mapeamento para a coluna "status_pagamento"
    private Boolean statusPagamento = false; // Valor padrão como false

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCpfUser() {
        return cpfUser;
    }

    public void setCpfUser(String cpfUser) {
        this.cpfUser = cpfUser;
    }

    public LocalDate getDataPartida() {
        return dataPartida;
    }

    public void setDataPartida(LocalDate dataPartida) {
        this.dataPartida = dataPartida;
    }

    public LocalTime getHorario() {
        return horario;
    }

    public void setHorario(LocalTime horario) {
        this.horario = horario;
    }

    public Boolean getStatusPagamento() {
        return statusPagamento;
    }

    public void setStatusPagamento(Boolean statusPagamento) {
        this.statusPagamento = statusPagamento;
    }
}
