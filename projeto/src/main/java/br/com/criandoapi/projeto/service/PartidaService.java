package br.com.criandoapi.projeto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.criandoapi.projeto.model.Partida;
import br.com.criandoapi.projeto.repository.InterfacePartida;

import java.time.LocalDate;
import java.util.List;

@Service
public class PartidaService {

    @Autowired
    private InterfacePartida partidaRepository;

    // Construtor para injeção de dependência
    public PartidaService(InterfacePartida partidaRepository) {
        this.partidaRepository = partidaRepository;
    }

    public List<Partida> listarPartida() {
        return partidaRepository.findAllByOrderByDataPartidaAsc();
    }

    public Partida novaPartida(Partida partida) {
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
}
