package br.com.criandoapi.projeto.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @Column(name = "cpf", unique = true, nullable = false)  
    private String cpf;
    
    @Column(name = "nome", length = 200, nullable = true) 
    private String nome;
    
    @Column(name = "telefone", length = 15, nullable = true) 
    private String telefone;
    
    @Column(name = "nascimento", columnDefinition = "DATE", nullable = false)
    private String nascimento;

   
    public String getNascimento() {
        return nascimento;
    }

    public void setNascimento(String nascimento) {
        this.nascimento = nascimento;
    }

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


    
}
