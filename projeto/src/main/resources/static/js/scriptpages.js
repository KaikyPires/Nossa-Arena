document.addEventListener('DOMContentLoaded', function () {
    // Função para calcular e atualizar o resultado
    function calcularEAtualizarResultado(data) {
        function calcularValorPartidas(quantidadePartidas) {
            return quantidadePartidas * 200;
        }

        let resultadoTotal = 0;

        data.forEach(usuario => {
            const valorMultiplicado = calcularValorPartidas(usuario.quantidadePartidas);
            resultadoTotal += valorMultiplicado;
        });

        const resultadoFormatado = resultadoTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        document.querySelector('.balance .info span').textContent = resultadoFormatado;
    }

    // Função para manipular o incremento de partidas
    function handleIncrementar(event) {
        const cpf = event.target.getAttribute('data-cpf');
        fetch(`http://localhost:8080/usuarios/${cpf}/incrementar-partidas`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao incrementar partidas');
            }
            return response.json();
        })
        .then(usuario => {
            const row = event.target.closest('tr');
            const quantidadePartidasElem = row.querySelector('.quantidade-partidas');

            if (quantidadePartidasElem) {
                const quantidadePartidasAtual = parseInt(quantidadePartidasElem.textContent, 10);
                quantidadePartidasElem.textContent = quantidadePartidasAtual + 1;
            } else {
                console.error('Elemento com a classe quantidade-partidas não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao incrementar partidas:', error);
        });
    }
    



    // Função para manipular a edição
    function handleEdit(event) {
        const cpf = event.target.getAttribute('data-cpf');
        window.location.href = `/edit_usuario.html?cpf=${cpf}`;
    }

    // Função para manipular a exclusão
    function handleDelete(event) {
        const cpf = event.target.getAttribute('data-cpf');
        fetch(`http://localhost:8080/usuarios/${cpf}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                const row = event.target.closest('tr');
                row.remove();
                alert('Usuário excluído com sucesso!');
            } else {
                console.error('Erro ao excluir o usuário');
            }
        })
        .catch(error => {
            console.error('Erro ao excluir o usuário:', error);
        });
    }

    // Função para atualizar a tabela de usuários
    function populateTable(data) {
        const tableBody = document.querySelector('#usuariosTable tbody');
        tableBody.innerHTML = '';

        data.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.cpf}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.telefone}</td>
                <td>${usuario.nascimento}</td>
                <td class="quantidade-partidas">${usuario.quantidadePartidas}</td>
                <td>
                    <button class="edit-btn" data-cpf="${usuario.cpf}">Editar</button>
                    <button class="delete-btn" data-cpf="${usuario.cpf}">Excluir</button>
                    <button class="incrementar-btn" data-cpf="${usuario.cpf}">Adicionar Partida</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEdit);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDelete);
        });

        document.querySelectorAll('.incrementar-btn').forEach(button => {
            button.addEventListener('click', handleIncrementar);
        });

        calcularEAtualizarResultado(data);
    }

    // Carregar dados iniciais
    fetch('http://localhost:8080/usuarios')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.quantidadePartidas - a.quantidadePartidas);
            populateTable(data);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });

    // Função para formatar a data para o formato yyyy-MM-dd
    function formatDateForBackend(dateString) {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Função para abrir o modal com dados
    function openConfirmationModal(date, time, cpf) {
        document.getElementById('selected-date').value = date;
        document.getElementById('selected-time').value = time;
        document.getElementById('cpf').value = cpf;
        document.getElementById('confirmation-modal').style.display = 'block';
    }

    // Função para fechar o modal
    function closeConfirmationModal() {
        document.getElementById('confirmation-modal').style.display = 'none';
    }

    // Função para submeter o formulário de confirmação
    function submitConfirmation() {
      const cpf = document.getElementById('cpf').value.trim() || null;
      const dateInput = document.getElementById('selected-date').value;
      const formattedDate = formatDateForBackend(dateInput);
      const horario = document.getElementById('selected-time').value;
    
      if (!formattedDate || !horario) {
        console.error('Data e horário são obrigatórios.');
        return;
      }
    
      const partidaData = {
        cpfUser: cpf,
        dataPartida: formattedDate,
        horario: horario,
        statusPagamento: 'Pendente'
      };
    
      // Enviar dados da nova partida
      fetch("http://localhost:8080/partidas", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(partidaData)
      })
      .then(function (res) {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error('Erro ao enviar os dados: ' + text);
          });
        }
        return res.json();
      })
      .then(function (data) {
        // Limpar campos do formulário
        document.getElementById('cpf').value = "";
        document.getElementById('selected-date').value = "";
        document.getElementById('selected-time').value = "";
    
        // Fechar o modal de confirmação
        closeConfirmationModal();
    
        // Atualizar a exibição do modal de sucesso
        document.getElementById('success-date').textContent = dateInput;
        document.getElementById('success-time').textContent = horario;
    
        // Exibir o modal de sucesso
        document.getElementById('success-modal').style.display = 'flex'; // Use 'flex' para centralizar o modal
    
        // Verificar e incrementar a quantidade de partidas do usuário
        if (cpf) {
          fetch(`http://localhost:8080/usuarios/${cpf}/incrementar-partidas`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao incrementar partidas');
            }
            return response.json();
          })
          .then(usuario => {
            console.log('Quantidade de partidas do usuário incrementada:', usuario);
            // Aqui você pode atualizar a tabela ou exibir uma mensagem ao usuário
          })
          .catch(error => {
            console.error('Erro ao incrementar partidas:', error);
          });
        }
      })
      .catch(function (error) {
        console.error('Erro ao enviar os dados:', error);
      });
    }
    
  
  // Adicionar evento de clique para o botão de confirmação
  const submitButton = document.getElementById('submit-confirmation');
  if (submitButton) {
      submitButton.addEventListener('click', submitConfirmation);
  }
  
  // Função para abrir/fechar sidebar
  document.getElementById('open_btn').addEventListener('click', function () {
      document.getElementById('sidebar').classList.toggle('open-sidebar');
  });
  
    // Tela de carregamento
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    window.addEventListener('load', function () {
        loadingScreen.style.display = 'none';
        content.style.display = 'block';
    });
});


const today = new Date();
let currentDay = today.getDate();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let startDayIndex = 0; // Índice inicial da semana
let selectedTimeSlot = null;

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

let appointments = {};

// Função para calcular o índice de início da semana
function calculateStartDayIndex() {
  const firstDayOfWeek = new Date(currentYear, currentMonth, currentDay).getDay();
  const startDate = new Date(currentYear, currentMonth, currentDay);
  const startOfWeek = new Date(startDate.setDate(startDate.getDate() - firstDayOfWeek));
  return startOfWeek.getDate() - 1; // Ajuste para o índice de início
}

// Função para atualizar o calendário para a semana atual
function updateCalendar() {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dateSlot = document.querySelector('.date-slot');
  dateSlot.innerHTML = '';

  // Calcula o início e o fim da semana
  const startOfWeek = new Date(currentYear, currentMonth, startDayIndex + 1);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // 7 dias por semana

  // Adiciona espaços em branco se houver dias antes do início da semana
  for (let i = 0; i < startOfWeek.getDay(); i++) {
    dateSlot.innerHTML += '<li class="date-slot-wrapper empty"></li>';
  }

  // Adiciona os dias da semana
  for (let d = startOfWeek; d <= endOfWeek; d.setDate(d.getDate() + 1)) {
    const day = d.getDate();
    const dayName = dayNames[d.getDay()];
    const isActive = (day === currentDay && currentMonth === today.getMonth() && currentYear === today.getFullYear());
    if (day > 0 && day <= daysInMonth) {
      dateSlot.innerHTML += `
        <li class="date-slot-wrapper">
          <div class="date-slot-item ${isActive ? 'active' : ''}" onclick="selectDay(${day})">
            ${day}
          </div>
          <div class="day-name">${dayName}</div>
        </li>`;
    } else {
      // Adiciona dias em branco para completar a semana
      dateSlot.innerHTML += '<li class="date-slot-wrapper empty"></li>';
    }
  }

  // Atualiza o texto do mês e ano
  document.getElementById('month-year').textContent = `${monthNames[currentMonth]} ${currentYear}`;
  loadTimeSlots();
}

function selectDay(day) {
  currentDay = day;
  updateCalendar();
}

function prevWeek() {
  startDayIndex -= 7;
  updateCalendar();
}

function nextWeek() {
  startDayIndex += 7;
  updateCalendar();
}

function loadTimeSlots() {
  const timeSlots = document.getElementById('time-slots');
  timeSlots.innerHTML = '';

  const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  times.forEach(time => {
    const isDisabled = appointments[`${currentYear}-${currentMonth + 1}-${currentDay}`]?.includes(time);
    const slotClass = isDisabled ? 'time-slot-item disabled' : 'time-slot-item';

    timeSlots.innerHTML += `
      <li class="${slotClass}" onclick="${isDisabled ? 'return false;' : `selectTimeSlot('${time}')`}">
        ${time}
      </li>`;
  });
}

function selectTimeSlot(time) {
  if (selectedTimeSlot === time) {
    selectedTimeSlot = null;
    document.querySelectorAll('.time-slot-item').forEach(item => item.classList.remove('selected'));
  } else {
    selectedTimeSlot = time;
    document.querySelectorAll('.time-slot-item').forEach(item => item.classList.remove('selected'));
    event.target.classList.add('selected');
    document.getElementById('confirm-button').style.display = 'block';
  }
}

function showConfirmationModal() {
  document.getElementById('selected-date').value = `${currentDay}/${currentMonth + 1}/${currentYear}`;
  document.getElementById('selected-time').value = selectedTimeSlot;
  document.getElementById('confirmation-modal').style.display = 'flex'; // Use 'flex' para centralizar
}

function closeConfirmationModal() {
  document.getElementById('confirmation-modal').style.display = 'none';
}

function submitConfirmation() {
  const date = `${currentYear}-${currentMonth + 1}-${currentDay}`;
  if (!appointments[date]) {
    appointments[date] = [];
  }
  appointments[date].push(selectedTimeSlot);

  document.getElementById('success-date').textContent = `${currentDay}/${currentMonth + 1}/${currentYear}`;
  document.getElementById('success-time').textContent = selectedTimeSlot;
  document.getElementById('confirmation-modal').style.display = 'none';
  document.getElementById('success-modal').style.display = 'flex'; // Use 'flex' para centralizar
}

function closeSuccessModal() {
  document.getElementById('success-modal').style.display = 'none';
  // Reset the calendar and selection
  selectedTimeSlot = null;
  loadTimeSlots();
  document.getElementById('confirm-button').style.display = 'none';
}

// Inicializar o calendário na semana que inclui o dia atual
startDayIndex = calculateStartDayIndex();
updateCalendar();





