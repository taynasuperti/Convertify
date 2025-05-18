// esse arquivo é que faz o cálculo da cotação | vai retornar os valores da cotação de acordo com os dados da API
const {converterMoeda} = require('../services/cotacao') //aqui está chamando a função converterMoeda do cotacao.js | é essa função que acessa a API e faz o cálculo

const getCotacao = async (req, res) => {//req é o pedido feito pelo front e o res é a resposta do back
    const { valor, de, para } = req.query; // aqui é pego os dados do front pelo query string | usa o método de desestruturalização para obter os valores que estão dentro da chave
    try {
        const valorConvertido = await converterMoeda(valor, de, para);//aqui é onde chama o serviço que vai buscar e calcular a taxa pra conversão | o await faz com que primeiro carregue todos os dados da API para dps entregar os resultados dentro da var valorConvertido

        res.json({valorConvertido});
    } catch (error) {
        console.error('Erro ao buscar os dados do cotacao.js: ', error);
        res.status(500).json({ error: 'Erro ao converter moeda' }); // o erro 500 é o erro interno do servidor
    }
};
module.exports = {getCotacao};