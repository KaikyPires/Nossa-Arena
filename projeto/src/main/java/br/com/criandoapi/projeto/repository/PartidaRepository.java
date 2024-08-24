package br.com.criandoapi.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.criandoapi.projeto.model.Partida;

public interface PartidaRepository extends JpaRepository<Partida, Long> {
    // Adicione métodos personalizados se necessário
}
