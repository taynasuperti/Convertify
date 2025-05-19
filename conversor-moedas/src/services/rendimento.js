// esse é o back do projeto | ele BUSCA os dados 
const axios = require('axios'); // é quem faz as requisições em HTTP

// aqui é criado a função assíncrona que vai buscar todas as cotações disponíveis
const buscarTodasAsMoedas = async () => {
    try {
        // aqui é criado a requisição da API
        const response = await axios.get('https://economia.awesomeapi.com.br/json/all'); // aqui a api retorna várias moedas

        const dados = response.data; // aqui é onde guarda os dados da API

        // validação dos dados retornados pela API
        if (!dados || typeof dados !== 'object') {
            console.error('Dados inválidos recebidos da API:', dados); // exibe uma mensagem de erro no console
            throw new Error('Dados inválidos recebidos da API.');
        }

        // aqui vai ser criado tipo um "filtro", onde só vai aparecer os dados que são significativos para o gráfico
        const resultado = Object.keys(dados).map((moeda) => ({
            nome: moeda, // pega o nome da moeda
            valor: parseFloat(dados[moeda].bid), // pega o valor da cotação e converte para número
        }));
        // nesse caso, só aparece o nome da moeda e o valor dela

        return resultado; // aqui retorna o array para ser usado no controller
    } catch (erro) {
        // emite a mensagem de erro caso a API não funcione
        console.error('Erro ao buscar cotações:', erro.message); // exibe o erro no console para debug
        throw new Error('Erro ao buscar cotações. Tente novamente mais tarde.'); // lança um erro para ser tratado pelo controller
    }
};

//aqui é onde vai ser criada a função de buscar os dados históriicos de cada moeda
const buscarHistoricoMoeda = async (moeda, dias = 7) => {
    try {
        // aqui é onde vai ser criada a requisição da API
        const response = await axios.get(`https://economia.awesomeapi.com.br/json/daily/${moeda}-BRL/dias${dias}`);// aqui a api retorna várias moedas
        const dados = response.data; // aqui é onde guarda os dados da API

        // aqui é onde ocorre a validação dos dados retornados pela API
        if (!dados || !Array.isArray(dados)) {
            throw new Error('Dados inválidos recebidos da API');
        }

        //aqui é onde será processado os dados históricos
        const historico = dados.map((item) => ({
            data: new Date(item.timestamp * 1000).toLocaleDateString('pt-BR'), // aqui é onde pega a data e transforma para o formato brasileiro
            valor: parseFloat(item.bid), // aqui é onde pega o valor da moeda e transforma para número
        }));

        // aqui é onde retorna os dados históricos
        return historico;
    } catch (erro) {
        // aqui é onde emite a mensagem de erro caso a API não funcione
        console.error(`Erro ao buscar o histórico da moeda ${moeda}:`, erro.message);
        throw new Error(`Erro ao buscar histórico da moeda`);
    } 
};

module.exports = { buscarTodasAsMoedas, buscarHistoricoMoeda

 }; // essa linha serve para que se possa exportar a função para o controller ou para o server.js