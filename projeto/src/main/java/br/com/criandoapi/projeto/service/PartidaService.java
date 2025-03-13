package br.com.criandoapi.projeto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.criandoapi.projeto.model.Partida;
import br.com.criandoapi.projeto.repository.InterfacePartida;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class PartidaService {

    @Autowired
    private InterfacePartida partidaRepository;

    // Construtor para injeção de dependência
    public PartidaService(InterfacePartida partidaRepository) {
        this.partidaRepository = partidaRepository;
    }

    public Partida salvarPartida(Partida partida) {
        return partidaRepository.save(partida);
    }

    public List<Partida> listarPartida() {
        return partidaRepository.findAllByOrderByDataPartidaAsc();
    }

    public Partida novaPartida(Partida partida) {
        if (partida.getPrecoCobrado() == null) {
            throw new IllegalArgumentException("O preço cobrado é obrigatório.");
        }
        return partidaRepository.save(partida);
    }

    public Partida buscarPartidaPorId(Long id) {
        return partidaRepository.findById(id).orElse(null);
    }

    public List<Partida> filtrarPorDia(LocalDate data) {
        return partidaRepository.findByDia(data);
    }

    public List<Partida> filtrarPorMes(int mes, int ano) {
        return partidaRepository.findByMes(mes, ano);
    }

    public List<Partida> filtrarPorSemana(int semana, int ano) {
        return partidaRepository.findBySemana(semana, ano);
    }

    public List<Partida> filtrarPorAno(int ano) {
        return partidaRepository.findByAno(ano);
    }

    public Partida atualizarPartida(Long id, Partida partidaAtualizada) {
        return partidaRepository.findById(id).map(partida -> {
            partida.setCpfUser(partidaAtualizada.getCpfUser());
            partida.setDataPartida(partidaAtualizada.getDataPartida());
            partida.setHorario(partidaAtualizada.getHorario());
            partida.setStatusPagamento(partidaAtualizada.getStatusPagamento());
            return partidaRepository.save(partida);
        }).orElse(null);
    }

    public boolean deletarPartida(Long id) {
        if (partidaRepository.existsById(id)) {
            partidaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Partida marcarComoPago(Long id) {
        return partidaRepository.findById(id).map(partida -> {
            // Atualiza o status para "Pago" (true), independente do valor anterior
            partida.setStatusPagamento(true); // Define como "Pago"
            return partidaRepository.save(partida);
        }).orElse(null);
    }

    public List<Map<String, Object>> listarPartidasComNomes() {
        return partidaRepository.findAllPartidasComNomes();
    }

}