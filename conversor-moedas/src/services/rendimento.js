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

module.exports = { buscarTodasAsMoedas }; // essa linha serve para que se possa exportar a função para o controller ou para o server.js