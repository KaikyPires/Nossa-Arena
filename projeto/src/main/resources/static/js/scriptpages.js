document.addEventListener('DOMContentLoaded', function () {
    // Identifica a classe da página atual
    const bodyClass = document.body.className;

    // Função auxiliar para adicionar eventos de forma segura
    function safelyAddEventListener(selector, event, handler) {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    // Funções para a página "home"
    if (bodyClass.includes('page-home')) {
        console.log('Página Home carregada.');

        // Adicione aqui as funcionalidades específicas da home...

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
    }

    // Funções para a página "cadastro"
    if (bodyClass.includes('page-cadastro')) {
        console.log('Página Cadastro carregada.');

        // Adicione aqui as funcionalidades específicas de cadastro...

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

        // Função para formatar a data para o formato yyyy-MM-dd
        function formatDateForBackend(dateString) {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        //Formata o CPF (123.456.789-10)
        function formatarCPF(cpf) {
            // Remove qualquer caractere que não seja número
            const apenasNumeros = cpf.replace(/\D/g, '');

            // Verifica se o CPF tem 11 dígitos
            if (apenasNumeros.length === 11) {
                return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9)}`;
            }

            // Retorna o CPF original se o formato for inválido
            return cpf;
        }

        //Formata a data de (yyyy-MM-dd) para (dd-MM-yyyy)

        function formatarData(data) {
            if (!data) return '';

            // Caso a data esteja no formato ISO (yyyy-MM-dd)
            if (data.includes('-')) {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            }

            // Caso a data esteja no formato dd/mm/yyyy, retorna como está
            if (data.includes('/')) {
                return data;
            }

            return data; // Retorna a data original se nenhum formato conhecido for detectado
        }

        //Formata o telefone ex. (31)1234-5678
        function formatarTelefone(telefone) {
            // Remove quaisquer caracteres que não sejam números
            const apenasNumeros = telefone.replace(/\D/g, '');

            // Verifica se o número tem o tamanho correto (10 ou 11 dígitos)
            if (apenasNumeros.length === 10) {
                // Formato para números fixos (31)1234-5678
                return `(${apenasNumeros.slice(0, 2)})${apenasNumeros.slice(2, 6)}-${apenasNumeros.slice(6)}`;
            } else if (apenasNumeros.length === 11) {
                // Formato para celulares (31)91234-5678
                return `(${apenasNumeros.slice(0, 2)})${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`;
            } else {
                // Retorna o número original se o tamanho for inválido
                return telefone;
            }
        }
    }

    // Funções para a página "dashboard"
    if (bodyClass.includes('page-dashboard')) {
        console.log('Página Dashboard carregada.');

        // Adicione aqui as funcionalidades específicas do dashboard...

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

    }

    // Funções para a página "horário"
    if (bodyClass.includes('page-horario')) {
        console.log('Página Horário carregada.');

        // Adicione aqui as funcionalidades específicas do horário...

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

        // Função para formatar a data para o formato yyyy-MM-dd
        function formatDateForBackend(dateString) {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        //Formata a data de (yyyy-MM-dd) para (dd-MM-yyyy)

        function formatarData(data) {
            if (!data) return '';

            // Caso a data esteja no formato ISO (yyyy-MM-dd)
            if (data.includes('-')) {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            }

            // Caso a data esteja no formato dd/mm/yyyy, retorna como está
            if (data.includes('/')) {
                return data;
            }

            return data; // Retorna a data original se nenhum formato conhecido for detectado
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

        function closeSuccessModal() {
            document.getElementById('success-modal').style.display = 'none';
            // Reset the calendar and selection
            selectedTimeSlot = null;
            loadTimeSlots();
            document.getElementById('confirm-button').style.display = 'none';
        }

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

        // Inicializar o calendário na semana que inclui o dia atual
        startDayIndex = calculateStartDayIndex();
        updateCalendar();
        document.getElementById('logout_btn').addEventListener('click', function (event) {
            event.preventDefault(); // Impede o redirecionamento imediato
            document.getElementById('confirmExitPopup').style.display = 'block'; // Mostra o popup
        });

        document.getElementById('confirmExit').addEventListener('click', function () {
            window.location.href = 'index.html'; // Redireciona para a página de logout
        });

        document.getElementById('cancelExit').addEventListener('click', function () {
            document.getElementById('confirmExitPopup').style.display = 'none'; // Fecha o popup
        });

    }

    // Funções para a página "jogadores"
    if (bodyClass.includes('page-jogadores')) {
        console.log('Página Jogadores carregada.');

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

        //Formata o CPF (123.456.789-10)
        function formatarCPF(cpf) {
            // Remove qualquer caractere que não seja número
            const apenasNumeros = cpf.replace(/\D/g, '');

            // Verifica se o CPF tem 11 dígitos
            if (apenasNumeros.length === 11) {
                return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9)}`;
            }

            // Retorna o CPF original se o formato for inválido
            return cpf;
        }

        //Formata a data de (yyyy-MM-dd) para (dd-MM-yyyy)

        function formatarData(data) {
            if (!data) return '';

            // Caso a data esteja no formato ISO (yyyy-MM-dd)
            if (data.includes('-')) {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            }

            // Caso a data esteja no formato dd/mm/yyyy, retorna como está
            if (data.includes('/')) {
                return data;
            }

            return data; // Retorna a data original se nenhum formato conhecido for detectado
        }

        //Formata o telefone ex. (31)1234-5678
        function formatarTelefone(telefone) {
            // Remove quaisquer caracteres que não sejam números
            const apenasNumeros = telefone.replace(/\D/g, '');

            // Verifica se o número tem o tamanho correto (10 ou 11 dígitos)
            if (apenasNumeros.length === 10) {
                // Formato para números fixos (31)1234-5678
                return `(${apenasNumeros.slice(0, 2)})${apenasNumeros.slice(2, 6)}-${apenasNumeros.slice(6)}`;
            } else if (apenasNumeros.length === 11) {
                // Formato para celulares (31)91234-5678
                return `(${apenasNumeros.slice(0, 2)})${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`;
            } else {
                // Retorna o número original se o tamanho for inválido
                return telefone;
            }
        }

        // Função para popular a tabela de jogadores
        function populateTable(data) {
            const tableBody = document.querySelector('#usuariosTable tbody');
            if (!tableBody) return; // Garante que o elemento exista

            tableBody.innerHTML = '';
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${formatarCPF(usuario.cpf)}</td>
            <td>${usuario.nome}</td>
            <td>${formatarTelefone(usuario.telefone)}</td>
            <td>${formatarData(usuario.nascimento)}</td>
            <td>${usuario.quantidadePartidas}</td>
            <td>
              <button class="edit-btn" data-cpf="${usuario.cpf}">Editar</button>
              <button class="delete-btn" data-cpf="${usuario.cpf}">Excluir</button>
            </td>
          `;
                tableBody.appendChild(row);
            });

            // Eventos para editar e excluir
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', handleEdit);
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        }

        // Carrega os jogadores ao abrir a página
        fetch('http://127.0.0.1:8080/usuarios')
            .then(response => response.json())
            .then(data => populateTable(data))
            .catch(error => console.error('Erro ao carregar jogadores:', error));

        // Função para editar jogador
        function handleEdit(event) {
            const cpf = this.dataset.cpf;
            fetch(`http://127.0.0.1:8080/usuarios/${cpf}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('editNome').value = data.nome;
                    document.getElementById('editTelefone').value = data.telefone || '';
                    document.getElementById('editNascimento').value = data.nascimento;
                    document.getElementById('editQuantidadePartidas').value = data.quantidadePartidas;
                    document.getElementById('editForm').dataset.cpf = cpf;
                    document.getElementById('editModal').style.display = 'block';
                })
                .catch(error => console.error('Erro ao buscar jogador:', error));
        }

        // Função para excluir jogador
        function handleDelete(event) {
            const cpf = this.dataset.cpf;
            fetch(`http://127.0.0.1:8080/usuarios/${cpf}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        alert('Usuário excluído com sucesso!');
                        event.target.closest('tr').remove();
                    } else {
                        throw new Error('Erro ao excluir usuário');
                    }
                })
                .catch(error => console.error('Erro ao excluir jogador:', error));
        }

        // Fechar modal de edição
        safelyAddEventListener('#closeModal', 'click', function () {
            document.getElementById('editModal').style.display = 'none';
        });

        // Salvar edição do jogador
        safelyAddEventListener('#editForm', 'submit', function (event) {
            event.preventDefault();

            const cpf = this.dataset.cpf;
            const formData = {
                nome: document.getElementById('editNome').value,
                telefone: document.getElementById('editTelefone').value,
                nascimento: document.getElementById('editNascimento').value,
                quantidadePartidas: parseInt(document.getElementById('editQuantidadePartidas').value, 10),
            };

            fetch(`http://127.0.0.1:8080/usuarios/${cpf}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao salvar jogador');
                    alert('Jogador atualizado com sucesso!');
                    document.getElementById('editModal').style.display = 'none';
                    return fetch('http://127.0.0.1:8080/usuarios');
                })
                .then(response => response.json())
                .then(data => populateTable(data))
                .catch(error => console.error('Erro ao salvar jogador:', error));
        });
    }

    // Funções gerais (aplicadas a todas as páginas)
    safelyAddEventListener('#open_btn', 'click', function () {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.toggle('open-sidebar');
    });

    safelyAddEventListener('#logout_btn', 'click', function (event) {
        event.preventDefault();
        const confirmExitPopup = document.getElementById('confirmExitPopup');
        if (confirmExitPopup) confirmExitPopup.style.display = 'block';
    });

    safelyAddEventListener('#confirmExit', 'click', function () {
        window.location.href = 'index.html';
    });

    safelyAddEventListener('#cancelExit', 'click', function () {
        const confirmExitPopup = document.getElementById('confirmExitPopup');
        if (confirmExitPopup) confirmExitPopup.style.display = 'none';
    });
});
