document.getElementById("formCadastrarCliente").addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura dos valores dos campos de entrada
    const cpf = document.getElementById("cpfCliente").value;
    const nomeCliente = document.getElementById("nomeCliente").value;
    const telefone = document.getElementById("telefoneCliente").value;
    const endereco = document.getElementById("enderecoCliente").value;

    // Corpo da requisição para enviar ao backend
    const cliente = {
        cpf: cpf,
        endereco: endereco,
        nome: nomeCliente,  // Certifique-se de que o nome no JSON corresponda exatamente ao esperado pelo backend
        telefone: telefone,
    };

    // Envia os dados para o backend via POST
    fetch("http://localhost:8080/api/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),  // Envia o objeto JSON
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.message || "Erro ao cadastrar cliente");
                });
            }
            return response.json();
        })
        .then((data) => {
            alert("Cliente cadastrado com sucesso!");

            // Atualiza o cache de clientes
            updateLojasCache();

            // Redireciona para a lista de clientes
            window.location.href = "ListaPedido.html";
        })
        .catch((error) => {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao cadastrar o cliente: " + error.message);
        });
});

// Função para atualizar o cache de clientes
function updateLojasCache() {
    fetch("http://localhost:8080/api/clientes")
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("clientes", JSON.stringify(data)); // Armazena os dados no localStorage
        })
        .catch((error) => console.error("Erro ao atualizar o cache de clientes:", error));
}
