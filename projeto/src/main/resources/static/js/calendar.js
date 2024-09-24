document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:8080/api/agenda'; // API para buscar os dados da Agenda

    // Função para carregar os agendamentos da Agenda
    function loadAgenda() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById('calendar-body');
                tbody.innerHTML = ''; // Limpa a tabela antes de preenchê-la

                // Loop pelos dados retornados da API
                data.forEach(item => {
                    const row = document.createElement('tr');

                    // Coluna da data
                    const diaCell = document.createElement('td');
                    diaCell.textContent = item.dia;
                    row.appendChild(diaCell);

                    // Coluna da hora
                    const horaCell = document.createElement('td');
                    horaCell.textContent = item.hora;
                    row.appendChild(horaCell);

                    // Coluna do status
                    const statusCell = document.createElement('td');
                    statusCell.textContent = item.statusAgendamento ? 'Disponível' : 'Reservado';
                    row.appendChild(statusCell);

                    // Adiciona a linha à tabela
                    tbody.appendChild(row);
                });
            })
            .catch(error => console.error('Erro ao carregar agendamentos:', error));
    }

    // Carrega os agendamentos ao iniciar a página
    loadAgenda();
});
