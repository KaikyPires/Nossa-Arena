document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector("form");
    const Icpf = document.querySelector("#cpf");
    const Inome = document.querySelector("#nome");
    const Itelefone = document.querySelector("#telefone");
    const Inascimento = document.querySelector("#nascimento");

    function cadastrar() {
        const userData = {
            cpf: Icpf.value,
            nome: Inome.value,
            telefone: Itelefone.value,
            nascimento: Inascimento.value
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
              
                throw new Error('Dados invalidos');
            }
            return res.json();
        })
        .then(function (data) {
            console.log("Resposta do servidor:", data);
        })
        .catch(function (error) {
            const errorMessage = document.getElementById('error-message');
                errorMessage.style.display = 'block';
                errorMessage.textContent = error.message;
        });
    }

    function limpar() {
        Icpf.value = "";
        Inome.value = "";
        Itelefone.value = "";
        Inascimento.value = "";
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

    function login() {
        const loginData = {
            cpf: Icpf.value,
            senha: Isenha.value
        };

        fetch("http://localhost:8080/usuarios/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (response.ok) {
               window.location.href = 'loading.html';
                
            } else {
                return response.text(text => { throw new Error(text); }); // Lê a mensagem de erro
            }
        })
            .then(function (res) {
                if (!res.ok) {
                    
                }
                return res.text(); // Altera para .text() para obter a resposta como texto
            })
            .then(function (data) {
                alert(data); // Exibe a resposta do servidor
            })
            .catch(function (error) {
                //const errorMessage = document.getElementById('error-message');
                errorMessage.style.display = 'block';
                errorMessage.textContent = error.message;
            });
    }
    function limparLogin() {
 
        Isenha.value = "";
    }
    

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário padrão
        login(); // Chama a função de login
        limparLogin();
    });
});


function togglePasswordVisibility() {
    var senhaField = document.getElementById("senha");
    var toggleIcon = document.getElementById("togglePassword");
    if (senhaField.type === "password") {
        senhaField.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        senhaField.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}