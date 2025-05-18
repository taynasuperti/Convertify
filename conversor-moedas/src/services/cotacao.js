//esse é o back do projeto |  
const axios = require('axios'); //esse axios é quem faz as requisições em HTTP para retornar a taxa para converter as moedas

//aqui vai ser a função que vai criar a conversão das moedas
const converterMoeda = async (valor, de, para) => {
    try {
        //aqui é a função que "chama" a API para a cotação
        const response = await axios.get(`https://economia.awesomeapi.com.br/last/${de}-${para}`);
        //aqui vem a resposta da API
        const taxa = parseFloat(response.data[`${de}${para}`].bid); //esse trecho "response.data[`${de}${para}`" serve para que a API entregue a resposta no formato para conversão das moedas
        //esse trecho completo serve para pegat a taxa de conversão entre a moeda que o usuário selecionar e a que ele pedir
        //aqui vai ser calculado a conversão
        const valorConvertido = (valor * taxa).toFixed(2); //aqui calcula o valor convertido e coloca ele em duas casas decimais

        return valorConvertido;
    } catch (error) {
        console.error('Erro ao buscar os dados da API:' , error);
        return null;
    }
};
module.exports = {converterMoeda}; //para exportar o converterMoeda para que ela tb possa ser usada lá no server.js