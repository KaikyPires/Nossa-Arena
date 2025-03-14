document.addEventListener('DOMContentLoaded', function () {
    const formularioCadastro = document.querySelector("form");
    const IcpfCadastro = document.querySelector("#cpf");
    const InomeCadastro = document.querySelector("#nome");
    const ItelefoneCadastro = document.querySelector("#telefone");
    const InascimentoCadastro = document.querySelector("#nascimento");

    const successPopup = document.getElementById('success-popup');
    const errorPopup = document.getElementById('error-popup');
    const errorMessage = document.getElementById('error-message');

    function showSuccessPopup() {
        if (successPopup) {
            successPopup.style.display = 'block';
        }
    }

    function showErrorPopup(message) {
        if (errorMessage && errorPopup) {
            errorMessage.textContent = message;
            errorPopup.style.display = 'block';
        }
    }

    function limparMascara(valor) {
        return valor.replace(/\D/g, ''); // Remove todos os caracteres que não são números
    }

    function validarCpf(cpf) {
        const cpfRegex = /^[0-9]{11}$/;
        return cpfRegex.test(cpf);
    }

    function validarNome(nome) {
        const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        return nomeRegex.test(nome);
    }

    function validarTelefone(telefone) {
        const telefoneRegex = /^[0-9]{10,11}$/;
        return telefoneRegex.test(telefone);
    }

    function cadastrar() {
        if (!IcpfCadastro || !InomeCadastro || !ItelefoneCadastro || !InascimentoCadastro) {
            console.error("Um ou mais campos do formulário não foram encontrados.");
            return;
        }

        const cpfSemMascara = limparMascara(IcpfCadastro.value);
        const telefoneSemMascara = limparMascara(ItelefoneCadastro.value);

        const cpfValido = validarCpf(cpfSemMascara);
        const nomeValido = validarNome(InomeCadastro.value);
        const telefoneValido = validarTelefone(telefoneSemMascara);

        if (!cpfValido) {
            showErrorPopup('CPF inválido. Deve conter exatamente 11 dígitos.');
            return;
        }

        if (!nomeValido) {
            showErrorPopup('Nome inválido. Use apenas letras e espaços.');
            return;
        }

        if (!telefoneValido) {
            showErrorPopup('Telefone inválido. Deve conter 10 ou 11 dígitos.');
            return;
        }

        const userData = {
            cpf: cpfSemMascara,
            nome: InomeCadastro.value,
            telefone: telefoneSemMascara,
            nascimento: InascimentoCadastro.value,
            quantidadePartidas: "0"
        };

        fetch("https://nossa-arena-production.up.railway.app/usuarios", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userData)
        })
        .then(function (res) {
            if (!res.ok) {
                throw new Error('Dados inválidos');
            }
            return res.json();
        })
        .then(function (data) {
            showSuccessPopup();
            limparCadastro();
        })
        .catch(function (error) {
            showErrorPopup(error.message);
        });
    }

    function limparCadastro() {
        if (IcpfCadastro) IcpfCadastro.value = "";
        if (InomeCadastro) InomeCadastro.value = "";
        if (ItelefoneCadastro) ItelefoneCadastro.value = "";
        if (InascimentoCadastro) InascimentoCadastro.value = "";
    }

    if (formularioCadastro) {
        formularioCadastro.addEventListener('submit', function (event) {
            event.preventDefault();
            cadastrar();
        });
    }

    const closeSuccessPopupBtn = document.getElementById('closeSuccessPopupBtn');
    const closeErrorPopupBtn = document.getElementById('closeErrorPopupBtn');

    if (closeSuccessPopupBtn) {
        closeSuccessPopupBtn.addEventListener('click', function () {
            if (successPopup) successPopup.style.display = 'none';
        });
    }

    if (closeErrorPopupBtn) {
        closeErrorPopupBtn.addEventListener('click', function () {
            if (errorPopup) errorPopup.style.display = 'none';
        });
    }
});
