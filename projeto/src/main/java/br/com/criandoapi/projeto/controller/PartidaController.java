package br.com.criandoapi.projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

import br.com.criandoapi.projeto.model.Partida;
import br.com.criandoapi.projeto.service.PartidaService;

import java.util.List;

@RestController
@RequestMapping("/partidas")
public class PartidaController {

    @Autowired
    private PartidaService partidaService;

    @GetMapping
    public List<Partida> listarPartidas() {
        return partidaService.listarPartida();
    }

    // Construtor para injeção de dependência
    public PartidaController(PartidaService partidaService) {
        this.partidaService = partidaService;
    }

    @PostMapping
    public ResponseEntity<Partida> criarPartida(@RequestBody Partida partida) {
        Partida novaPartida = partidaService.novaPartida(partida);
        return new ResponseEntity<>(novaPartida, HttpStatus.CREATED);
    }

    @GetMapping("/dia")
    public ResponseEntity<List<Partida>> filtrarPorDia(@RequestParam("data") LocalDate data) {
        List<Partida> partidas = partidaService.filtrarPorDia(data);
        return new ResponseEntity<>(partidas, HttpStatus.OK);
    }

    @GetMapping("/mes")
    public ResponseEntity<List<Partida>> filtrarPorMes(@RequestParam("mes") int mes, @RequestParam("ano") int ano) {
        List<Partida> partidas = partidaService.filtrarPorMes(mes, ano);
        return new ResponseEntity<>(partidas, HttpStatus.OK);
    }

    @GetMapping("/semana")
    public ResponseEntity<List<Partida>> filtrarPorSemana(@RequestParam("semana") int semana,
            @RequestParam("ano") int ano) {
        List<Partida> partidas = partidaService.filtrarPorSemana(semana, ano);
        return new ResponseEntity<>(partidas, HttpStatus.OK);
    }

    @GetMapping("/ano")
    public ResponseEntity<List<Partida>> filtrarPorAno(@RequestParam("ano") int ano) {
        List<Partida> partidas = partidaService.filtrarPorAno(ano);
        return new ResponseEntity<>(partidas, HttpStatus.OK);
    }

    @PutMapping("/{id}/marcar-pago")
    public ResponseEntity<Partida> marcarComoPago(@PathVariable Long id) {
        Partida partidaAtualizada = partidaService.marcarComoPago(id);
        if (partidaAtualizada != null) {
            return new ResponseEntity<>(partidaAtualizada, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
