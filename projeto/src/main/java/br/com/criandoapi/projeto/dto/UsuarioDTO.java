package br.com.criandoapi.projeto.dto;

public class UsuarioDTO {
    private String cpf;
    private String nome;
    private Integer quantidadePartidas;

    public UsuarioDTO(String cpf, String nome, Integer quantidadePartidas) {
        this.cpf = cpf;
        this.nome = nome;
        this.quantidadePartidas = quantidadePartidas;
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

    public Integer getQuantidadePartidas() {
        return quantidadePartidas;
    }

    public void setQuantidadePartidas(Integer quantidadePartidas) {
        this.quantidadePartidas = quantidadePartidas;
    }

 
}
