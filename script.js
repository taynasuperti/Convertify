// Função para carregar as moedas disponíveis nos selects
async function carregarMoedas() {
    const origemSelect = document.getElementById('moeda-origem');
    const destinoSelect = document.getElementById('moeda-destino');

    try {
        // Requisição para obter as moedas disponíveis
        const resposta = await fetch('https://economia.awesomeapi.com.br/json/available/uniq');
        const dados = await resposta.json();

        // Limpa os selects antes de adicionar novas opções
        origemSelect.innerHTML = '';
        destinoSelect.innerHTML = '';

        // Itera sobre os dados recebidos e adiciona as opções aos selects
        for (const codigo in dados) {
            const nome = dados[codigo];

            const optionOrigem = document.createElement('option');
            optionOrigem.value = codigo;
            optionOrigem.textContent = `${codigo} - ${nome}`;

            const optionDestino = document.createElement('option');
            optionDestino.value = codigo;
            optionDestino.textContent = `${codigo} - ${nome}`;

            origemSelect.appendChild(optionOrigem);
            destinoSelect.appendChild(optionDestino);
        }

        // Define valores padrão
        origemSelect.value = 'USD';
        destinoSelect.value = 'BRL';

    } catch (erro) {
        console.error('Erro ao carregar moedas:', erro);
        origemSelect.innerHTML = '<option>Erro ao carregar moedas</option>';
        destinoSelect.innerHTML = '<option>Erro ao carregar moedas</option>';
    }
}

// Função para realizar a conversão de moedas
async function converter() {
    const valorInput = document.getElementById('input-valor');
    const origemSelect = document.getElementById('moeda-origem');
    const destinoSelect = document.getElementById('moeda-destino');
    const resultadoDiv = document.getElementById('resultado');

    const valor = parseFloat(valorInput.value.replace(',', '.'));
    const moedaOrigem = origemSelect.value;
    const moedaDestino = destinoSelect.value;

    // Validação do valor inserido
    if (isNaN(valor)) {
        resultadoDiv.textContent = 'Por favor, insira um valor válido.';
        return;
    }

    try {
        // Requisição para obter a cotação atual
        const resposta = await fetch(`https://economia.awesomeapi.com.br/json/last/${moedaOrigem}-${moedaDestino}`);
        const dados = await resposta.json();

        const chave = `${moedaOrigem}${moedaDestino}`;
        const cotacao = parseFloat(dados[chave].bid);

        const resultado = (valor * cotacao).toFixed(2);

        resultadoDiv.textContent = `${valor.toFixed(2)} ${moedaOrigem} = ${resultado} ${moedaDestino}`;
    } catch (erro) {
        console.error('Erro ao converter moedas:', erro);
        resultadoDiv.textContent = 'Erro ao realizar a conversão.';
    }
}

// Chama a função para carregar as moedas ao carregar a página
document.addEventListener('DOMContentLoaded', carregarMoedas);