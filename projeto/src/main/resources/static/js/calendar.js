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

        // Função para ativar o modo tela cheia
        function ativarTelaCheia() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch((err) => {
                    console.error(`Erro ao tentar ativar o modo tela cheia: ${err.message}`);
                });
            }
        }

        // Verifica se a página foi carregada e o usuário estava em tela cheia
        document.addEventListener('DOMContentLoaded', (event) => {
            // Verifica o localStorage se o modo tela cheia estava ativo
            if (localStorage.getItem('modoTelaCheia') === 'true') {
                ativarTelaCheia();
            }
        });

        // Ativa o modo tela cheia ao clicar em qualquer parte da tela
        document.addEventListener('click', function () {
            ativarTelaCheia();
            // Salva no localStorage que o modo tela cheia foi ativado
            localStorage.setItem('modoTelaCheia', 'true');
        });

        // Sai do modo tela cheia e atualiza o localStorage quando o usuário sai da tela cheia
        document.addEventListener('fullscreenchange', (event) => {
            if (!document.fullscreenElement) {
                localStorage.setItem('modoTelaCheia', 'false');
            }
        });