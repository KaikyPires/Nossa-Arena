document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector("form");
    const Icpf = document.querySelector("#cpf");
    const Inome = document.querySelector("#nome");
    const Itelefone = document.querySelector("#telefone");
    const Isenha = document.querySelector("#senha");

    function cadastrar() {
        const userData = {
            cpf: Icpf.value,
            nome: Inome.value,
            telefone: Itelefone.value,
            senha: Isenha.value
        };

        console.log("Dados a serem enviados:", userData);

        fetch("http://localhost:8080/usuarios", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userData)
        })
            .then(function (res) {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(function (data) {
                console.log("Resposta do servidor:", data);
            })
            .catch(function (error) {
                console.log('Fetch error:', error);
            });
    }

    function limpar() {
        Icpf.value = "";
        Inome.value = "";
        Itelefone.value = "";
        Isenha.value = "";
    }

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário padrão
        cadastrar(); // Chama a função de cadastro
        limpar(); // Limpa o formulário após enviar
    });
});