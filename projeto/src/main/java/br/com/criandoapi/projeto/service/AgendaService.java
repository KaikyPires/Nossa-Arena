package br.com.criandoapi.projeto.service;

import br.com.criandoapi.projeto.model.Agenda;
import br.com.criandoapi.projeto.model.Partida;
import br.com.criandoapi.projeto.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AgendaService {

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private PartidaService partidaService; // Adiciona a injeção do serviço de Partida

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

    public Agenda atualizarStatusAgendamento(LocalDate dia, LocalTime hora, Partida partida) {
        // Encontre a agenda correspondente à data e hora
        List<Agenda> agendas = agendaRepository.findByDia(dia);

        // Usar stream, filtro e findFirst para encontrar a agenda correspondente
        Agenda agenda = agendas.stream()
                .filter(a -> a.getHora().equals(hora))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Agenda não encontrada para a data e hora fornecidas"));

        // Salvar a partida primeiro se for uma nova (id == null)
        if (partida.getId() == null) {
            partida = partidaService.salvarPartida(partida);
        }

        // Atualizar o status da agenda e associar a partida
        agenda.setStatusAgendamento(false); // False significa que está reservado
        agenda.setPartida(partida);

        // Salve as mudanças no banco de dados
        return agendaRepository.save(agenda);
    }

    public Agenda marcarComoEscolinha(Long id) {
        Agenda agenda = agendaRepository.findById(id).orElse(null);
        if (agenda != null) {
            agenda.setEscolinha(true); // Marca como escolinha
            return agendaRepository.save(agenda); // Salva a alteração
        }
        return null; // Retorna null se o ID não foi encontrado
    }

}
