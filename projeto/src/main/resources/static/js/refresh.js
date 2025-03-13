document.addEventListener('DOMContentLoaded', function () {
    const refreshButton = document.getElementById('refresh-button');

    if (refreshButton) {
        refreshButton.addEventListener('click', function () {
            location.reload();
        });
    } else {
        console.error("O botão de refresh com ID 'refresh-button' não foi encontrado.");
    }
});
