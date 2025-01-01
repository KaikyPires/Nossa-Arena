package br.com.criandoapi.projeto.controller;

import br.com.criandoapi.projeto.model.Agenda;
import br.com.criandoapi.projeto.model.AgendaUpdateRequest;
import br.com.criandoapi.projeto.model.Partida;
import br.com.criandoapi.projeto.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/agenda")
public class AgendaController {

    @Autowired
    private AgendaService agendaService;

    @GetMapping
    public ResponseEntity<List<Agenda>> listarTodos() {
        List<Agenda> agendas = agendaService.listarTodos();
        return ResponseEntity.ok(agendas);
    }

    @GetMapping("/{dia}")
    public ResponseEntity<List<Agenda>> getHorariosDoDia(@PathVariable String dia) {
        LocalDate localDate = LocalDate.parse(dia);
        List<Agenda> horarios = agendaService.getHorariosDoDia(localDate);
        return ResponseEntity.ok(horarios);
    }

    @PutMapping("/update/{dia}/{hora}")
    public ResponseEntity<Agenda> atualizarStatusAgendamento(@PathVariable String dia, @PathVariable String hora,
            @RequestBody AgendaUpdateRequest agendaUpdateRequest) {
        try {
            LocalDate localDate = LocalDate.parse(dia);
            LocalTime localTime = LocalTime.parse(hora);

            Partida partida = agendaUpdateRequest.getPartida();

            // Atualiza a agenda com a nova partida e altera o status
            Agenda agendaAtualizada = agendaService.atualizarStatusAgendamento(localDate, localTime, partida);

            return ResponseEntity.ok(agendaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null); // Retorna 404 se não encontrar a agenda
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Retorna 500 se ocorrer um erro inesperado
        }
    }

    @PostMapping
    public ResponseEntity<?> adicionarHorario(@RequestBody Agenda agenda) {
        try {
            Agenda savedAgenda = agendaService.adicionarHorario(agenda);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAgenda);
        } catch (RuntimeException e) {
            // Retorna um status 409 com uma mensagem clara
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Horário já existe para o dia " + agenda.getDia() + " às " + agenda.getHora() + ".");
        } catch (Exception e) {
            // Retorna um status 500 para erros genéricos
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno ao adicionar horário.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarHorario(@PathVariable Long id) {
        agendaService.deletarHorario(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/escolinha")
    public ResponseEntity<Agenda> marcarComoEscolinha(@PathVariable Long id) {
        Agenda agenda = agendaService.marcarComoEscolinha(id);
        if (agenda != null) {
            return ResponseEntity.ok(agenda);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}