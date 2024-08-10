document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/usuarios')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#usuariosTable tbody');
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.cpf}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.telefone}</td>
                    <td>${usuario.nascimento}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
});

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
