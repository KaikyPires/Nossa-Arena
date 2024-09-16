// Função para buscar horários do dia
async function buscarHorariosDoDia(dia) {
    try {
        const response = await fetch(`http://localhost:8080/api/agenda/${dia}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar horários');
        }
        const horarios = await response.json();
        
        // Exemplo de exibir os horários
        horarios.forEach(horario => {
            console.log(`Hora: ${horario.hora}, Disponível: ${horario.situacao ? 'Sim' : 'Não'}`);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Exemplo de uso: buscar horários de '2024-09-16'
buscarHorariosDoDia('2024-09-16');

// Função para adicionar um novo horário
async function adicionarHorario(dia, hora, situacao) {
    const data = {
        dia: dia,  // '2024-09-16'
        hora: hora,  // '14:00'
        situacao: situacao  // true (disponível) ou false (indisponível)
    };

    try {
        const response = await fetch('http://localhost:8080/api/agenda/adicionar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Erro ao adicionar horário');
        }
        const resultado = await response.json();
        console.log('Horário adicionado:', resultado);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Exemplo de uso: adicionar um horário para '2024-09-16' às '14:00' como disponível
adicionarHorario('2024-09-16', '14:00', true);

// Função para deletar um horário
async function deletarHorario(id) {
    try {
        await fetch(`http://localhost:8080/api/agenda/deletar/${id}`, {
            method: 'DELETE'
        });
        console.log('Horário deletado:', id);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Exemplo de uso: deletar o horário com ID 1
deletarHorario(1);
