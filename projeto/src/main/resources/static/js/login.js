document.addEventListener('DOMContentLoaded', function () {
    const formularioLogin = document.querySelector("#loginForm");
    const IcpfLogin = document.querySelector("#cpf");
    const IsenhaLogin = document.querySelector("#senha");

    // Credenciais fixas
    const CREDENCIAIS_FIXAS = {
        cpf: "123456",
        senha: "admin"
    };

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', function (event) {
            event.preventDefault();
            login();
        });

        function login() {
            if (!IcpfLogin || !IsenhaLogin) {
                console.error("Campos de login não encontrados.");
                return;
            }

            const cpfInput = IcpfLogin.value.trim();
            const senhaInput = IsenhaLogin.value.trim();

            if (cpfInput === CREDENCIAIS_FIXAS.cpf && senhaInput === CREDENCIAIS_FIXAS.senha) {
                // Redireciona para a página desejada após o login
                window.location.href = 'loading.html';
            } else {
                alert("Credenciais inválidas. Tente novamente.");
            }
        }
    } else {
        console.error("O formulário com ID 'loginForm' não foi encontrado.");
    }

    const togglePasswordIcon = document.getElementById('togglePassword');
    if (togglePasswordIcon) {
        togglePasswordIcon.addEventListener('click', function () {
            const senhaField = document.getElementById("senha");
            if (senhaField.type === "password") {
                senhaField.type = "text";
                togglePasswordIcon.classList.remove("fa-eye");
                togglePasswordIcon.classList.add("fa-eye-slash");
            } else {
                senhaField.type = "password";
                togglePasswordIcon.classList.remove("fa-eye-slash");
                togglePasswordIcon.classList.add("fa-eye");
            }
        });
    }
});
