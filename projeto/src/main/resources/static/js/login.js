document.addEventListener('DOMContentLoaded', function () {
    const formularioLogin = document.querySelector("#loginForm");
    const IcpfLogin = document.querySelector("#cpf");
    const IsenhaLogin = document.querySelector("#senha");

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

            const loginData = {
                cpf: IcpfLogin.value,
                senha: IsenhaLogin.value
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
                        alert("Credenciais inválidas.");
                    }
                })
                .catch(function (error) {
                    alert("Erro ao realizar login: " + error.message);
                });
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
