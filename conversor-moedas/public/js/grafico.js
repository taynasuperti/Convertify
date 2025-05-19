// este arquivo será usado para gerar gráficos de rendimento utilizando Chart.js

//aqui é criado a função que vai criar o gráfico
const criarGraficoRendimento = (dados) => {
    //aqui é onde será selecionado o elemento canvas la do html pelo id
    const ctx = document.getElementById('graficoRendimento').getContext('2d'); // aqui é onde pega o elemento do canvas
    // o "ctx" é o contexto de renderização do canvas| é ele que "permite" que o chart.js desenhe o gráfico

    //essas linhas abaixo é onde se estabelece as configurações dos dados do gráfico
    const configuracao = {
        type: 'line', // aqui é onde será definido o tipo de gráfico (nesse caso o de linha)
        data: {
            labels: dados.labels,  //aqui é onde será colocado os nomes das moedas ou as datas
            datasets: [
                {
                    label: 'Histórico de Rendimento', // aqui é onde será colocado o nome do gráfico
                    data: dados.valores, // aqui é onde será colocado os valores do eixo y (tipo os valores das moedas)
                    borderColor: 'rgb(22, 88, 9)', // aqui é onde será definido a cor da linha do gráfico
                    backgroundColor: 'rgba(22, 88, 9, 0.2)', // aqui é onde será definido a cor de fundo do gráfico
                    borderWidth: 2, // aqui é onde será definido a largura da linha do gráfico
                    tension: 0.4, //para suavizar as curvas das linhas do gráfico

                },
            ],
        },
        options: {
            responsive: true, //para que o gráfico seja responsivo
            plugins: {
                legend: {
                    display: true, //para que a legenda do gráfico seja exibida
                    position: 'top', //posição da legenda (nesse caso em cima)
                },
            },
            scales: {
                x: {
                    title: {
                        display: true, //para que o título do eixo x seja exibido
                        text: 'Moedas', //aqui é onde será colocado o nome do eixo x
                    },
                },
                y: {
                    title: {
                        display: true, //para que o título do eixo y seja exibido
                        text: 'Valores (em R$)', //aqui é onde será colocado o nome do eixo y
                    },
                    beginAtZero: false, //para que o eixo y comece no valor mínimo dos dados
                },
            },
        },
    };

    //aqui é onde realmente será criado o gráfico
    new Chart(ctx, configuracao); // aqui é onde o gráfico é criado com as configurações definidas acima
};

// aqui é onde será criada a função para buscar os dados do back para coloca-lo no gráfico e exibi-lo no front
const carregarDadosGrafico = async () => {
    try {
        //aqui será feita a requisição para o back, onde vai ser pego os dados de lá para mostrá-los no gráfico
        const resposta = await fetch('/rendimento');
        const dados = await resposta.json(); // aqui é onde os dados são transformados para um formato que o javascript entenda

        //aqui será onde os dados serão processados em um formato que o chart.js entenda
        const labels = dados.map((item) => item.nome); // aqui é onde pega os dados do eixo x (o nome das moedas)
        const valores = dados.map((item) => item.valor); // aqui é onde pega os dados do eixo y (os valores das moedas)

        // aqui é onde chama a função para criar o gráfico com os dados processados
        criarGraficoRendimento({labels, valores});
    } catch (erro) {
        console.error('Erro ao carregar os dados do gráfico:', erro); // aqui é onde exibe o erro no console
    }
};

//aqui será criado a função de buscar e exibir os dados do histórico de cada moeda
const carregarHistoricoMoeda = async (moeda) => {
    try {
        const resposta = await fetch(`/historico?moeda=${moeda}`);
        const dados = await resposta.json(); // aqui é onde os dados são transformados para um formato que o javascript entenda

        const labels = dados.map((item) => item.datda); // chama as datas para exibir por causa do histórico
        const valores = dados.map((item) => item.valor); //aqui chama os valores de cada moeda para exibir no gráfico

        // aqui é onde chama a função para criar o gráfico com os dados processados
        criarGraficoRendimento({labels, valores});
    } catch (erro) {
        console.error('Erro ao carregar os dados do histórico:', erro); // aqui é onde exibe o erro no console
    }
};

// Exemplo de chamada para carregar o histórico de uma moeda
document.getElementById('seletorMoeda').addEventListener('change', (event) => {
    const moedaSelecionada = event.target.value;
    carregarHistoricoMoeda(moedaSelecionada);
});

// aqui é onde chama a função para carregar os dados do gráfico quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarDadosGrafico);