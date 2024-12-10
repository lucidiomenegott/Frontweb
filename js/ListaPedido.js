
async function carregarPedidos() {
try {
const response = await fetch('http://localhost:8080/api/clientes'); // Atualize com a URL correta
const clientes = await response.json();

// Monta uma lista de pedidos a partir dos clientes
const pedidos = clientes.flatMap(cliente => 
    cliente.pedidos.map(pedido => ({
        id: pedido.id,
        descricao: pedido.descricao,
        valorTotal: pedido.valorTotal,
        status: pedido.status,
        clienteNome: cliente.nome // Relaciona ao cliente
    }))
);

exibirPedidos(pedidos);
} catch (error) {
console.error('Erro ao carregar pedidos:', error);
}
}

function exibirPedidos(pedidos) {
const tabela = document.getElementById('pedidosTable'); // Ajuste para o ID do seu elemento
tabela.innerHTML = '';

pedidos.forEach(pedido => {
const row = document.createElement('tr');
row.innerHTML = `
    <td>${pedido.id}</td>
    <td>${pedido.descricao}</td>
    <td>${pedido.valorTotal}</td>
    <td>${pedido.status}</td>
    <td>${pedido.clienteNome}</td>
`;
tabela.appendChild(row);
});
}

// Carrega os pedidos ao carregar a página
document.addEventListener('DOMContentLoaded', carregarPedidos);

