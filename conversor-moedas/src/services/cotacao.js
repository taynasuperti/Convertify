// esse é o back do projeto |  
const axios = require('axios'); // esse axios é quem faz as requisições em HTTP para retornar a taxa para converter as moedas

// aqui vai ser a função que vai criar a conversão das moedas
const converterMoeda = async (valor, de, para) => {
    // validação dos parâmetros recebidos
    if (!valor || isNaN(valor) || !de || !para) {
        console.error('Parâmetros inválidos fornecidos para a conversão:', { valor, de, para });
        throw new Error('Parâmetros inválidos. Certifique-se de enviar "valor", "de" e "para".');
    }

    try {
        // aqui é a função que "chama" a API para a cotação
        const response = await axios.get(`https://economia.awesomeapi.com.br/last/${de}-${para}`);
        // aqui vem a resposta da API
        const taxa = parseFloat(response.data[`${de}${para}`].bid); // esse trecho "response.data[`${de}${para}`" serve para que a API entregue a resposta no formato para conversão das moedas
        // esse trecho completo serve para pegar a taxa de conversão entre a moeda que o usuário selecionar e a que ele pedir

        // aqui vai ser calculado a conversão
        const valorConvertido = (valor * taxa).toFixed(2); // aqui calcula o valor convertido e coloca ele em duas casas decimais

        return valorConvertido; // retorna o valor convertido para quem chamou a função
    } catch (error) {
        // se ocorrer algum erro, ele será capturado aqui
        console.error('Erro ao buscar os dados da API:', error.message, { valor, de, para }); // exibe o erro no console para debug
        throw new Error('Erro ao buscar os dados da API. Tente novamente mais tarde.'); // lança um erro para ser tratado por quem chamou a função
    }
};

module.exports = { converterMoeda }; // para exportar o converterMoeda para que ela também possa ser usada lá no server.js