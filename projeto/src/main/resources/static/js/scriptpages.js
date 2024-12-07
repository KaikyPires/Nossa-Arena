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
    }

    // Funções para a página "dashboard"
    if (bodyClass.includes('page-dashboard')) {
        console.log('Página Dashboard carregada.');

        // Adicione aqui as funcionalidades específicas do dashboard...

        // Tela de carregamento
        const loadingScreen = document.getElementById('loading-screen');
        const content = document.getElementById('content');

        window.addEventListener('load', function () {
            loadingScreen.style.display = 'none';
            content.style.display = 'block';
        });

    }

    // Funções para a página "horário"
    if (bodyClass.includes('page-horario')) {
        console.log('Página Horário carregada.');

        // Adicione aqui as funcionalidades específicas do horário...

        // Tela de carregamento
        const loadingScreen = document.getElementById('loading-screen');
        const content = document.getElementById('content');

        window.addEventListener('load', function () {
            loadingScreen.style.display = 'none';
            content.style.display = 'block';
        });

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

        const today = new Date();
        let currentDay = today.getDate();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();
        let startDayIndex = 0; // Índice inicial da semana

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


        // Tela de carregamento
        const loadingScreen = document.getElementById('loading-screen');
        const content = document.getElementById('content');

        window.addEventListener('load', function () {
            loadingScreen.style.display = 'none';
            content.style.display = 'block';
        });


        // Modal de confirmação de exclusão
        const confirmDeletePopup = document.getElementById('confirmDeletePopup');
        const confirmDeleteButton = document.getElementById('confirmDeleteButton');
        const cancelDeleteButton = document.getElementById('cancelDeleteButton');

        let jogadorParaExcluir = null; // Armazena o CPF do jogador a ser excluído

        // Função para abrir o modal de exclusão
        function openDeleteModal(cpf) {
            jogadorParaExcluir = cpf; // Armazena o CPF do jogador
            confirmDeletePopup.style.display = 'block'; // Exibe o modal
        }

        // Função para fechar o modal de exclusão
        function closeDeleteModal() {
            jogadorParaExcluir = null; // Limpa o CPF armazenado
            confirmDeletePopup.style.display = 'none'; // Oculta o modal
        }

        // Adiciona evento ao botão "Sim" do modal
        confirmDeleteButton.addEventListener('click', function () {
            if (jogadorParaExcluir) {
                // Faz a exclusão do jogador
                fetch(`http://127.0.0.1:8080/usuarios/${jogadorParaExcluir}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            alert('Jogador excluído com sucesso!');
                            document.querySelector(`button[data-cpf="${jogadorParaExcluir}"]`).closest('tr').remove();
                            closeDeleteModal(); // Fecha o modal após excluir
                        } else {
                            throw new Error('Erro ao excluir jogador');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao excluir jogador:', error);
                        alert('Erro ao excluir jogador. Tente novamente.');
                        closeDeleteModal(); // Fecha o modal mesmo em caso de erro
                    });
            }
        });

        // Adiciona evento ao botão "Cancelar" do modal
        cancelDeleteButton.addEventListener('click', closeDeleteModal);

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

        // Função para manipular o clique no botão "Excluir"
        function handleDelete(event) {
            const cpf = this.dataset.cpf; // Obtém o CPF do botão
            openDeleteModal(cpf); // Abre o modal de exclusão
        }

        // Carrega os jogadores ao abrir a página
        fetch('http://127.0.0.1:8080/usuarios')
            .then(response => response.json())
            .then(data => populateTable(data))
            .catch(error => console.error('Erro ao carregar jogadores:', error));

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
