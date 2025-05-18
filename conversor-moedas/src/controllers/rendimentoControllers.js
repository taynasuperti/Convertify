//esse arquivo é o "controlador" | é ele quem recebe os "pedidos" do front, chama os serviços (nesse caso o services/cotacao.js) e depois manda a responta para o front dnv 
// ele CHAMA o serviço feito pelo rendimento.js SOMENTE QUANDO NECESSÁRIO e filtra O QUE FAZER COM O RESULTADO DOS DADOS OBTIDOS
//ele NÃO faz a lógica de pegar os dados da API, só chama a função
const {buscarTodasAsMoedas} = require('../services/rendimento'); //chama a função buscarTodasAsMoedas lá do rendimennto.js

const getRendimento = async (req, res) => { //req é o pedido feito pelo front e o res é a resposta do back
    const {getRendimento} = req.query;
    try { // executa oq estiver aqui dentro
        const dados = await buscarTodasAsMoedas().req.query; //aqui o back pede os dados do rendimento.js | o await faz com que primeiro carregue todos os dados da API para dps entregar os resultados dentro da var dados
        res.json(dados); // converte a resposta da API em um "linguagem" que o js entende para enviar para o front
    } catch (error) {
        console.error('Erro ao buscar os dados do rendimento.js: ', error);
        res.status(500).json({ error: 'Erro ao obter rendimento' }); // o erro 500 é o erro interno do servidor
    }
};
module.exports = {getRendimento};
