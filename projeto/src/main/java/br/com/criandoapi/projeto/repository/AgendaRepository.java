package br.com.criandoapi.projeto.repository;

import br.com.criandoapi.projeto.model.Agenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    List<Agenda> findByDia(LocalDate dia);
}
