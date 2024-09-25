package br.com.criandoapi.projeto.controller;

import br.com.criandoapi.projeto.model.Agenda;
import br.com.criandoapi.projeto.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @PostMapping
    public ResponseEntity<Agenda> adicionarHorario(@RequestBody Agenda agenda) {
        Agenda savedAgenda = agendaService.adicionarHorario(agenda);
        return ResponseEntity.status(201).body(savedAgenda);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarHorario(@PathVariable Long id) {
        agendaService.deletarHorario(id);
        return ResponseEntity.noContent().build();
    }
    

    
}
