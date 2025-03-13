package br.com.criandoapi.projeto.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @Column(name = "cpf", unique = true, nullable = false, length = 11) // CPF com 11 dígitos
    private String cpf;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "telefone", length = 15, nullable = true) // Ajustado para String, se for número grande
    private String telefone;

    @Column(name = "nascimento", columnDefinition = "DATE", nullable = false)
    private String nascimento;

    @Column(name = "quantidade_partidas", nullable = false)
    private int quantidadePartidas;

    // Getters e Setters

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getNascimento() {
        return nascimento;
    }

    public void setNascimento(String nascimento) {
        this.nascimento = nascimento;
    }

    public int getQuantidadePartidas() {
        return quantidadePartidas;
    }

    public void setQuantidadePartidas(int quantidadePartidas) {
        this.quantidadePartidas = quantidadePartidas;
    }
}
