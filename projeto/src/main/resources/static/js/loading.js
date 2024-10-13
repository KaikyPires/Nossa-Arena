gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    {
      opacity: 0,
      display: "none",
      duration: 1.5,
      delay: 3.5,
      onComplete: () => {
        // Redirecionar para outra página após a animação
        window.location.href = 'home.html'; // Substitua com o URL da sua página principal
      },
    }
  );
  
  gsap.fromTo(
    ".logo-name",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
    }
  );
  
        // Função para ativar o modo tela cheia
        function ativarTelaCheia() {
          if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch((err) => {
                  console.error(`Erro ao tentar ativar o modo tela cheia: ${err.message}`);
              });
          }
      }

      // Verifica se a página foi carregada e o usuário estava em tela cheia
      document.addEventListener('DOMContentLoaded', (event) => {
          // Verifica o localStorage se o modo tela cheia estava ativo
          if (localStorage.getItem('modoTelaCheia') === 'true') {
              ativarTelaCheia();
          }
      });

      // Ativa o modo tela cheia ao clicar em qualquer parte da tela
      document.addEventListener('click', function () {
          ativarTelaCheia();
          // Salva no localStorage que o modo tela cheia foi ativado
          localStorage.setItem('modoTelaCheia', 'true');
      });

      // Sai do modo tela cheia e atualiza o localStorage quando o usuário sai da tela cheia
      document.addEventListener('fullscreenchange', (event) => {
          if (!document.fullscreenElement) {
              localStorage.setItem('modoTelaCheia', 'false');
          }
      });