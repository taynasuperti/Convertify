//esse é o back do projeto | ele BUSCA os dados 
const axios = require('axios'); // é quem faz as requisições em HTTP

//aqui é criado a função assíncrona que vai buscar todas as cotações disponíveis
const buscarTodasAsMoedas = async () => {
    try {
        //aqui é criado a requisição da API
        const response = await axios.get('https://economia.awesomeapi.com.br/json/all'); // aqui a api retorna várias moedas

        const dados = response.data //aqui é onde guarda os dados da API

        // aqui vai ser criado tipo um "filtro", onde só vai aparecer os dados que são significativos para o gráfico
        const resultado = Object.keys(dados).map((moeda) => ({
            nome: moeda,
            valor: parseFloat(dados[moeda].bid),
        }));
        // nesse caso, só aparece o nome da moeda e o valor dela

        return resultado; //aqui retorna o array para para ser usado no controller
        //emite a mensagem de erro caso a API não funcione
    } catch (erro) {
        console.error('Erro ao buscar cotações: ', erro);
        return null;
    }
};
module.exports = {buscarTodasAsMoedas}; //essa linha serve para que se possa exportar a função para o controller ou para o server.js 