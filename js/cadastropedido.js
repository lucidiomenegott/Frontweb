document.addEventListener('DOMContentLoaded', async function() {
    // Carregar clientes ao carregar a página
    await carregarClientes();
});

async function carregarClientes() {
    try {
        const response = await fetch('http://localhost:8080/api/clientes');
        if (response.ok) {
            const clientes = await response.json();
            const selectCliente = document.getElementById('ClientePedido');

            // Adiciona a opção "Selecione o Cliente"
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;  // Aqui colocamos o ID do cliente
                option.textContent = cliente.nome;  // Exibimos o nome do cliente
                selectCliente.appendChild(option);
            });
        } else {
            alert('Erro ao carregar clientes: ' + await response.text());
        }
    } catch (error) {
        alert('Erro ao conectar ao servidor: ' + error.message);
    }
}

document.getElementById('formCadastrarPedido').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Pegando os valores dos campos do formulário
    const descricao = document.getElementById('DescricaoPedido').value;
    const valor = parseFloat(document.getElementById('ValorPedido').value) || 0;
    const status = document.getElementById('StatusPedido').value;
    const clienteId = document.getElementById('ClientePedido').value;  // ID do cliente selecionado

    // Validando se um cliente foi selecionado
    if (!clienteId) {
        alert('Por favor, selecione um cliente');
        return;
    }

    // Validando se o campo valor foi preenchido corretamente
    if (valor <= 0) {
        alert('Por favor, insira um valor válido para o pedido');
        return;
    }


    // Criando o objeto de pedido a ser enviado para o backend
    const pedido = {
        descricao: descricao,
        valorTotal: parseFloat(valor).toFixed(2),  // Enviando como número de ponto flutuante
        status: status,
        clienteId: clienteId  // Enviando o ID do cliente selecionado
    };

    try {
        // Enviando os dados via POST para o backend
        const response = await fetch('http://localhost:8080/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido)
        });

        let result;
        try {
            result = await response.json();
        } catch (jsonError) {
            result = await response.text();
        }

        if (response.ok) {
            alert('Pedido cadastrado com sucesso! ID: ' + result.id);
            document.getElementById('formCadastrarPedido').reset();
        } else {
            alert('Erro ao cadastrar pedido: ' + (result.message || result));
        }
    } catch (error) {
        alert('Erro ao conectar ao servidor: ' + error.message);
    }
});
