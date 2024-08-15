document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/usuarios')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.quantidadePartidas - a.quantidadePartidas);
            const tableBody = document.querySelector('#usuariosTable tbody');
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.cpf}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.telefone}</td>
                    <td>${usuario.nascimento}</td>
                    <td>${usuario.quantidadePartidas}</td>
                     <td>
                        <button class="edit-btn" data-cpf="${usuario.cpf}">Editar</button>
                        <button class="delete-btn" data-cpf="${usuario.cpf}">Excluir</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            calcularEAtualizarResultado(data);
                
            // Adiciona os eventos de clique para os botões
            document.querySelectorAll('.save-btn').forEach(button => {
                button.addEventListener('click', handleSave);
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
    });
    function handleSave(event) {
        const cpf = event.target.getAttribute('data-cpf');
        const row = event.target.closest('tr');
        
        const nome = row.querySelector('.edit-nome').value;
        const telefone = row.querySelector('.edit-telefone').value;
        const nascimento = row.querySelector('.edit-nascimento').value;
        const quantidadePartidas = parseInt(row.querySelector('.edit-quantidadePartidas').value, 10);
    
        const usuario = { cpf, nome, telefone, nascimento, quantidadePartidas };
    
        fetch(`http://localhost:8080/usuarios`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => {
            if (response.ok) {
                alert('Usuário atualizado com sucesso!');
            } else {
                console.error('Erro ao atualizar o usuário');
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar o usuário:', error);
        });
    }
    
    // Função para lidar com a exclusão
    function handleDelete(event) {
        const cpf = event.target.getAttribute('data-cpf');
        fetch(`http://localhost:8080/usuarios/${cpf}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Remove a linha da tabela
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
    // Função para lidar com a edição
    function handleEdit(event) {
        const cpf = event.target.getAttribute('data-cpf');
        // Redireciona ou exibe um formulário para edição
        window.location.href = `/edit_usuario.html?cpf=${cpf}`;
    }
    
    // Função para lidar com a exclusão
    function handleDelete(event) {
        const cpf = event.target.getAttribute('data-cpf');
        fetch(`http://localhost:8080/usuarios/${cpf}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Remove a linha da tabela
                const row = event.target.closest('tr');
                row.remove();
            } else {
                console.error('Erro ao excluir o usuário');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
};

document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.querySelector('main');

    // Simule um atraso para demonstrar a tela de carregamento
    setTimeout(() => {
        loadingScreen.style.display = 'none'; // Oculta a tela de carregamento
        mainContent.style.display = 'block'; // Exibe o conteúdo principal
    }, 1000); // Ajuste o tempo conforme necessário
});


document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/usuarios/partidas')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#partidasTable tbody');
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.cpf}</td>
                    <td>${usuario.quantidadePartidas}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("form");
    const container = document.querySelector("#data-container");

    if (form && container) {
        fetch('http://localhost:8080/usuarios/partidas')
            .then(response => response.json())
            .then(data => {
                // Supondo que data é uma lista de itens
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item.nome; // Exemplo de conteúdo
                    container.appendChild(div);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os dados:', error);
            });
    } else {
        console.error('Elementos DOM não encontrados.');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout_btn'); // Botão de logout
    const logoutConfirmation = document.getElementById('logout-confirmation');
    const confirmLogoutButton = document.getElementById('confirm-logout');
    const cancelLogoutButton = document.getElementById('cancel-logout');
    
    // Verifica se o botão de logout e os popups existem
    if (logoutButton && logoutConfirmation && confirmLogoutButton && cancelLogoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault(); // Impede a ação padrão do botão
            logoutConfirmation.style.display = 'block'; // Exibe o popup de confirmação
        });

        confirmLogoutButton.addEventListener('click', function () {
            window.location.href = 'index.html'; // Redireciona para a página inicial
        });

        cancelLogoutButton.addEventListener('click', function () {
            logoutConfirmation.style.display = 'none'; // Oculta o popup
        });
    } else {
        console.error("Um ou mais elementos não foram encontrados no DOM.");
    }
});
document.getElementById('phone-icon').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Número de telefone a ser copiado
    const phoneNumber = '+55 31 99957-5269'; // Substitua pelo número desejado

    // Cria um elemento de textarea temporário
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = phoneNumber;
    document.body.appendChild(tempTextArea);

    // Seleciona e copia o texto
    tempTextArea.select();
    document.execCommand('copy');

    // Remove o elemento de textarea temporário
    document.body.removeChild(tempTextArea);

    
});

document.getElementById('phone-icon').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Número de telefone a ser copiado
    const phoneNumber = '5531999575269'; // Substitua pelo número desejado

    // Cria um elemento de textarea temporário
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = phoneNumber;
    document.body.appendChild(tempTextArea);

    // Seleciona e copia o texto
    tempTextArea.select();
    document.execCommand('copy');

    // Remove o elemento de textarea temporário
    document.body.removeChild(tempTextArea);

    // Exibe a notificação
    const notification = document.getElementById('notification');
    notification.style.display = 'block';

    // Oculta a notificação após 3 segundos
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
});

// Função para calcular o valor total das partidas multiplicado por 200 e atualizar o HTML
function calcularEAtualizarResultado(data) {
    // Função interna para multiplicar o valor das partidas
    function calcularValorPartidas(quantidadePartidas) {
        return quantidadePartidas * 200;
    }

    let resultadoTotal = 0;

    // Calcula o valor total
    data.forEach(usuario => {
        const valorMultiplicado = calcularValorPartidas(usuario.quantidadePartidas);
        resultadoTotal += valorMultiplicado;
    });

    // Atualiza o conteúdo do HTML com o resultado total
    const resultadoFormatado = resultadoTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    document.querySelector('.balance .info span').textContent = resultadoFormatado;
}
document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/usuarios')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.quantidadePartidas - a.quantidadePartidas);
            populateTable(data);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
});

function populateTable(data) {
    const tableBody = document.querySelector('#usuariosTable tbody');
    tableBody.innerHTML = ''; // Limpa o corpo da tabela antes de adicionar novas linhas

    data.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.cpf}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.telefone}</td>
            <td>${usuario.nascimento}</td>
            <td>${usuario.quantidadePartidas}</td>
            <td>
                <button class="edit-btn" data-cpf="${usuario.cpf}">Editar</button>
                <button class="delete-btn" data-cpf="${usuario.cpf}">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Adiciona eventos para os botões de editar e excluir
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', handleEdit);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDelete);
    });
}

function searchCPF() {
    const searchValue = document.getElementById('cpf-search').value.toLowerCase();
    const rows = document.querySelectorAll('#usuariosTable tbody tr');
    let resultHTML = '';

    rows.forEach(row => {
        const cpfCell = row.querySelector('td:first-child').textContent.toLowerCase();
        if (cpfCell.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function handleEdit(event) {
    // Função para editar o usuário
    const cpf = event.target.getAttribute('data-cpf');
    console.log('Edit user with CPF:', cpf);
}

function handleDelete(event) {
    // Função para excluir o usuário
    const cpf = event.target.getAttribute('data-cpf');
    console.log('Delete user with CPF:', cpf);
}