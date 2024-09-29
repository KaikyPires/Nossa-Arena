package br.com.criandoapi.projeto.service;

import br.com.criandoapi.projeto.model.Agenda;
import br.com.criandoapi.projeto.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AgendaService {

    @Autowired
    private AgendaRepository agendaRepository;

    public List<Agenda> listarTodos() {
        return agendaRepository.findAll();
    }

    public List<Agenda> getHorariosDoDia(LocalDate dia) {
        return agendaRepository.findByDia(dia);
    }

    public Agenda adicionarHorario(Agenda agenda) {
        return agendaRepository.save(agenda);
    }

    public void deletarHorario(Long id) {
        agendaRepository.deleteById(id);
    }


}
