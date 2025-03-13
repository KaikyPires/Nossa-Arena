package br.com.criandoapi.projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.criandoapi.projeto.model.Partida;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface InterfacePartida extends JpaRepository<Partida, Long> {

    // Ordenar por data
    List<Partida> findAllByOrderByDataPartidaAsc();

    // Filtrar partidas por um dia específico
    @Query("SELECT p FROM Partida p WHERE p.dataPartida = :data")
    List<Partida> findByDia(@Param("data") LocalDate data);

    // Filtrar partidas por um mês específico
    @Query("SELECT p FROM Partida p WHERE MONTH(p.dataPartida) = :mes AND YEAR(p.dataPartida) = :ano")
    List<Partida> findByMes(@Param("mes") int mes, @Param("ano") int ano);

    // Filtrar partidas por uma semana específica
    @Query("SELECT p FROM Partida p WHERE YEAR(p.dataPartida) = :ano AND FUNCTION('WEEK', p.dataPartida) = :semana")
    List<Partida> findBySemana(@Param("semana") int semana, @Param("ano") int ano);

    // Filtrar partidas por um ano específico
    @Query("SELECT p FROM Partida p WHERE YEAR(p.dataPartida) = :ano")
    List<Partida> findByAno(@Param("ano") int ano);

    @Query("SELECT new map(p.id as id, p.cpfUser as cpfUser, p.dataPartida as dataPartida, "
            + "p.horario as horario, p.statusPagamento as statusPagamento, "
            + "u.nome as nomeUsuario, p.precoCobrado as precoCobrado) "
            + "FROM Partida p LEFT JOIN Usuario u ON p.cpfUser = u.cpf")
    List<Map<String, Object>> findAllPartidasComNomes();

}
