package br.com.criandoapi.projeto.model;

public class AgendaUpdateRequest {
    private boolean statusAgendamento;
    private Partida partida;

    // Getters e setters
    public boolean isStatusAgendamento() {
        return statusAgendamento;
    }

    public void setStatusAgendamento(boolean statusAgendamento) {
        this.statusAgendamento = statusAgendamento;
    }

    public Partida getPartida() {
        return partida;
    }

    public void setPartida(Partida partida) {
        this.partida = partida;
    }
}
