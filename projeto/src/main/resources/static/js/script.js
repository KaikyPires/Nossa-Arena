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
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector("form");
    const Icpf = document.querySelector("#cpf");
    const Isenha = document.querySelector("#senha");

    if (!formulario || !Icpf || !Isenha) {
        console.error('Um ou mais elementos não foram encontrados.');
        return;
    }

    function login() {
        const loginData = {
            cpf: Icpf.value,
            senha: Isenha.value
        };

        console.log("Dados de login a serem enviados:", loginData);

        fetch("http://localhost:8080/usuarios/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(loginData)
        })
        .then(function (res) {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.text(); // Mudado para .text() para lidar com resposta não JSON
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
        Isenha.value = "";
    }

    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio do formulário padrão
            login(); // Chama a função de login
            limpar(); // Limpa o formulário após enviar
        });
    }
});
function generateToken(length = 32) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        token += charset[randomIndex];
    }
    return token;
}

const myToken = generateToken();
console.log(myToken);


