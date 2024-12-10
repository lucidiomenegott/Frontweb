/*
// Função para obter as lojas e popular o dropdown
function carregarproduto() {
    fetch('http://localhost:8080/api/clientes')  // A URL para obter a lista de lojas
        .then(response => response.json())
        .then(data => {
            const selectLoja = document.getElementById('loja');
            selectLoja.innerHTML = '<option value="">Selecione uma loja</option>'; // Limpa o select antes de adicionar
            data.forEach(loja => {
                const option = document.createElement('option');
                option.value = loja.id;  // Armazena o ID da loja
                option.textContent = loja.razaosocial;  // Exibe o nome da loja
                selectLoja.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar lojas:', error));
}

// Função para enviar o produto e vincular à loja
function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const lojaId = document.getElementById('loja').value;

    if (!nome || !descricao || !preco || !lojaId) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const produto = {
        nome: nome,
        descricao: descricao,
        preco: preco,
        lojaId: lojaId  // Envia o ID da loja selecionada
    };

    fetch('http://localhost:8080/produto/salvar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto)  // Envia o produto com a loja associada
    })
    .then(response => response.json())
    .then(data => {
        alert('Produto cadastrado com sucesso!');
        // Redirecionar ou atualizar a interface conforme necessário
    })
    .catch(error => {
        console.error('Erro ao cadastrar o produto:', error);
        alert('Erro ao cadastrar o produto.');
    });
}

// Chama a função para carregar as lojas ao carregar a página
document.addEventListener('DOMContentLoaded', carregarLojas);

// Adiciona o evento de submit ao formulário de cadastro de produto
const formProduto = document.getElementById('productForm');
formProduto.addEventListener('submit', cadastrarProduto);
*/
