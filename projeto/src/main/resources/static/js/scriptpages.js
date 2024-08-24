document.addEventListener('DOMContentLoaded', function () {
    // Função para calcular o valor total das partidas multiplicado por 200 e atualizar o HTML
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




        
       // Função para abrir o modal com dados
function openConfirmationModal(date, time, cpf) {
    document.getElementById('selected-date').value = date;
    document.getElementById('selected-time').value = time;
    document.getElementById('name').value = cpf;
    document.getElementById('confirmation-modal').style.display = 'block';
}

// Função para fechar o modal
function closeConfirmationModal() {
    document.getElementById('confirmation-modal').style.display = 'none';
}

// Função para enviar dados ao servidor
function submitConfirmation() {
    const date = document.getElementById('selected-date').value;
    const time = document.getElementById('selected-time').value;
    const cpf = document.getElementById('name').value;

    if (!date || !time || !cpf) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const partidaData = {
        cpf_user: cpf,
        data_partida: date,
        horario: time,
        status_pagamento: 'Pendente'
    };

    fetch('http://localhost:8080/partidas', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(partidaData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao adicionar partida');
        }
        return response.json();
    })
    .then(data => {
        console.log('Partida adicionada:', data);
        atualizarTabelaPartidas(); // Atualizar tabela com os dados mais recentes
        closeConfirmationModal();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao adicionar partida: ' + error.message);
    });
}
        
    // Função de abrir/fechar sidebar
    document.getElementById('open_btn').addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('open-sidebar');
    });

    // Tela de carregamento
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.querySelector('main');

    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
    }, 1000);

    // Copiar número de telefone e exibir notificação
    document.getElementById('phone-icon').addEventListener('click', function(event) {
        event.preventDefault();

        const phoneNumber = '5531999575269';
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = phoneNumber;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);

        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    });

    // Logout com confirmação
    const logoutButton = document.getElementById('logout_btn');
    const logoutConfirmation = document.getElementById('logout-confirmation');
    const confirmLogoutButton = document.getElementById('confirm-logout');
    const cancelLogoutButton = document.getElementById('cancel-logout');

    if (logoutButton && logoutConfirmation && confirmLogoutButton && cancelLogoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault();
            logoutConfirmation.style.display = 'block';
        });

        confirmLogoutButton.addEventListener('click', function () {
            window.location.href = 'index.html';
        });

        cancelLogoutButton.addEventListener('click', function () {
            logoutConfirmation.style.display = 'none';
        });
    } else {
        console.error("Um ou mais elementos não foram encontrados no DOM.");
    }
});
