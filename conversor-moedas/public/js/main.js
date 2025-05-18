// função para carregar as moedas disponíveis nos selects
async function carregarMoedas() {
    // o async vai criar uma função para buscar essas moedas \ vai esperar uma reposta
    const origemSelect = document.getElementById('moeda-origem');
    const destinoSelect = document.getElementById('moeda-destino');
    // aqui seleciona os dois selects da página 

    try {
        // requisição para obter as moedas disponíveis (uso da api externa)
        const resposta = await fetch('https://economia.awesomeapi.com.br/json/available/uniq');
        // aqui serve para acessar a api onde estão os dados necessários   
        // o fetch busca os dados
        // o await sinaliza uma "espera" até que receba as informações da api
        const dados = await resposta.json();
        // depois que a resposta chega, a é necessário transformar ela em um formato que o javaScript entenda (por isso se chama JSON)
        if (!resposta.ok) throw new Error("Erro na API");

        
        origemSelect.innerHTML = '';
        destinoSelect.innerHTML = '';
        // antes de colocar as novas moedas é neessário limpar os selects antes de adicionar novas opções

        // intera sobre os dados recebidos e adiciona as opções aos selects
        const codigosOrdenados = Object.keys(dados).sort();
         // aqui é criado o laço de repetição, passando por cada tipo de moeda e ordenando o nome delas em ordem alfabética
        for (const codigo of codigosOrdenados) {
            const nome = dados[codigo];
            // aqui é selecionado o nome da moeda
            const optionOrigem = document.createElement('option');
            optionOrigem.value = codigo;
            optionOrigem.textContent = `${codigo} - ${nome}`;
            // aqui é criado uma nova opção para o select de origem, para mostrar qual é a moeda

            const optionDestino = document.createElement('option');
            optionDestino.value = codigo;
            optionDestino.textContent = `${codigo} - ${nome}`;
            // aqui é criado uma nova opção para o select de destino, para mostrar qual é a moeda

            origemSelect.appendChild(optionOrigem);
            destinoSelect.appendChild(optionDestino);
            //aqui é colocado essas opções dentro da caixinha do select novamente    
        }  
        origemSelect.value = 'BRL';
        destinoSelect.value = 'USD';
        // aqui é definido os valores padrão

    } catch (erro) {
        console.error('Erro ao carregar moedas:', erro);
        //aqui é para caso ocorra algum erro, apareça no console de erro
        origemSelect.innerHTML = '<option>Erro ao carregar moedas</option>';
        destinoSelect.innerHTML = '<option>Erro ao carregar moedas</option>';
        // aqui é colocado uma mensagenzinha de erro caso de algo errado
    }
}


async function converter() {
    // aqui é criado a função para realizar a conversão de moedas
    const valorInput = document.getElementById('input-valor');
    const origemSelect = document.getElementById('moeda-origem');
    const destinoSelect = document.getElementById('moeda-destino');
    const resultadoDiv = document.getElementById('resultado');
    // aqui, é seleciona todos os elementos da página para que seja necessário a conversão (o valor digitado, as moedas escolhidas e onde será mostrado o resultado)

    const valor = parseFloat(valorInput.value.replace(',', '.'));
    //aqui é selecionado o número informado pelo usuário para que ele seja transformado em um número de verdade, também é trocado a vírgula por um ponto (que é o padrão de leitura do javascript) 
    const moedaOrigem = origemSelect.value;
    const moedaDestino = destinoSelect.value;
    // aqui é pego quais foram as moedas escolhidas

    // validação do valor inserido
    if (isNaN(valor)) {
        resultadoDiv.textContent = 'Por favor, insira um valor válido.';
        return;
    }
    // aqui é mostrado uma mensagem de erro caso a pessoa digite algo que não é um número

    try {
        // requisição para obter a cotação atual
        const resposta = await fetch(`https://economia.awesomeapi.com.br/json/last/${moedaOrigem}-${moedaDestino}`);
        // aqui é pego novamente a api, mas dessa vez é para pegar o valor da conversão entre as duas moedas informadas
        const dados = await resposta.json();
        //aqui ocorre a transformação para um formato que consiga usar

        const chave = `${moedaOrigem}${moedaDestino}`;
        const cotacao = parseFloat(dados[chave].bid);
        // aqui é pego o valor da cotação fornecida pela api

        const resultado = (valor * cotacao).toFixed(2);
        //aqui formatamos o resultado para aparecer em 2 casas decimais

        resultadoDiv.textContent = `${valor.toFixed(2)} ${moedaOrigem} = ${resultado} ${moedaDestino}`;
        //aqui mostra o resultado na tela
    } catch (erro) {
        console.error('Erro ao converter moedas:', erro);
        resultadoDiv.textContent = 'Erro ao realizar a conversão.';
        //aqui se não conseguir pegar a cotação (por erro de conexão ou código de moeda), é mostrado uma mensagem de erro
    }
}


// chama a função para carregar as moedas ao carregar a página
document.addEventListener('DOMContentLoaded', carregarMoedas);