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
    }

    // Funções para a página "jogadores"
    if (bodyClass.includes('page-jogadores')) {
        console.log('Página Jogadores carregada.');


        // Tela de carregamento
        const loadingScreen = document.getElementById('loading-screen');
        const content = document.getElementById('content');

        window.addEventListener('load', function () {
            loadingScreen.style.display = 'none';
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
