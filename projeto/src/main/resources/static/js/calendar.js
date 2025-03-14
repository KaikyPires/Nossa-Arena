document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://nossa-arena-production.up.railway.app/api/agenda'; // URL para buscar os dados da agenda
    let datesList = [];

    function loadDates() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                datesList = [...new Set(data.map(item => item.dia))].sort();
                findNextAvailableDate();
            })
            .catch(error => console.error('Erro ao carregar as datas:', error));
    }

    function findNextAvailableDate() {
        const hoje = new Date().toISOString().split('T')[0];
        let index = datesList.indexOf(hoje);

        if (index === -1) {
            index = datesList.findIndex(date => date > hoje); // Busca a próxima data disponível
        }

        if (index !== -1) {
            loadAgenda(datesList[index]);
        } else {
            console.log('Nenhuma data disponível encontrada.');
        }
    }

    function loadAgenda(date) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.dia === date);
                renderDate(date);
                renderTimeSlots(filteredData);
            })
            .catch(error => console.error('Erro ao carregar a agenda:', error));
    }

    function renderDate(date) {
        const dateSlots = document.getElementById('date-slots');
        dateSlots.innerHTML = `<li class="date-slot-item">${formatarData(date)}</li>`;
    }

    function renderTimeSlots(data) {
        const timeSlots = document.getElementById('time-slots');
        timeSlots.innerHTML = '';
        data.sort((a, b) => a.hora.localeCompare(b.hora));

        data.forEach(item => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = item.hora;
            button.className = item.statusAgendamento ? 'disponivel' : 'reservado';
            button.disabled = !item.statusAgendamento;

            if (item.statusAgendamento) {
                button.addEventListener('click', () => {
                    showConfirmationModal(item.dia, item.hora);
                });
            }

            li.appendChild(button);
            timeSlots.appendChild(li);
        });
    }

    function formatarData(data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    loadDates();
});
