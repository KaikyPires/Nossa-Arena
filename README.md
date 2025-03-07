# Nossa Arena

## Descrição

"Nossa Arena" é uma aplicação desenvolvida para gerenciar partidas e receitas de uma arena de jogos, bem como oferecer a funcionalidade de agendamento de partidas através de um calendário. O projeto calcula receitas diárias, semanais, mensais, anuais e das últimas 24 horas, exibindo os dados de forma clara. Através do calendário, os usuários podem agendar partidas em horários disponíveis, gerenciando os agendamentos diretamente na interface.

## Funcionalidades

- **Calendário de Agendamentos**: Interface visual para que os usuários possam agendar partidas em horários disponíveis. O calendário exibe o dia atual e permite a seleção de horários, garantindo que os horários já ocupados fiquem bloqueados.
- **Exibição de Partidas**: Lista todas as partidas registradas, incluindo informações sobre data, status (Pago/Pendente) e valor.
- **Cálculo de Receitas**: Exibe receitas diárias, semanais, mensais, anuais e das últimas 24 horas.
- **Status de Pagamento**: Exibe o status de pagamento das partidas (Pago ou Pendente), com distinções visuais (vermelho para pendente, verde para pago).
- **Filtros por Data**: Permite filtrar as partidas por dia, semana, mês ou ano.

## Tecnologias Utilizadas

- **Front-end**: HTML, CSS, JavaScript
- **Back-end**: Java Spring Boot
- **Banco de Dados**: MySQL
- **API**: Comunicação com o banco de dados através de uma API REST, utilizando Spring Boot para operações CRUD nas partidas e agendamentos.
- **Bibliotecas Adicionais**: 
  - FontAwesome para ícones.
  - Axios (ou Fetch API) para realizar chamadas HTTP à API.
  - FullCalendar.js para o calendário de agendamentos. 

## Imagens do Projeto (Protótipo)

![image](https://github.com/user-attachments/assets/37e64dc5-98b5-484b-99c5-6cef828e9be1)
*Tela inicial do aplicativo.*

![image](https://github.com/user-attachments/assets/c6f8e672-63bf-482b-8bf8-b04a8eef6725)
*Tela da central do Dashboard.*

![image](https://github.com/user-attachments/assets/40911841-88f5-4f5a-90ea-582c8963ec1b)
*Primeiro protótipo do calendário.*

(![image](https://github.com/user-attachments/assets/4fbd41f8-dc8d-48a3-b8e1-6e9760e82115)
*Gestão de pagamentos e receitas da arena.*

![image](https://github.com/user-attachments/assets/13f28cbf-04a3-4574-b08a-33221a874832)
*Criação de um novo perfil de jogador/cliente.*

![image](https://github.com/user-attachments/assets/3339b944-6548-4588-bb1b-0e5cff7ad91e)
*Primeiro protótipo do histórico de cada perfil dos clientes.*
