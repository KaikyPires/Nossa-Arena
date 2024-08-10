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
