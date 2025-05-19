// esse arquivo é o "controlador" | é ele quem recebe os "pedidos" do front, chama os serviços (nesse caso o services/rendimento.js) e depois manda a resposta para o front novamente 
// ele CHAMA o serviço feito pelo rendimento.js SOMENTE QUANDO NECESSÁRIO e filtra O QUE FAZER COM O RESULTADO DOS DADOS OBTIDOS 
// ele NÃO faz a lógica de pegar os dados da API, só chama a função
const { buscarTodasAsMoedas } = require('../services/rendimento'); // chama a função buscarTodasAsMoedas lá do rendimento.js

const getRendimento = async (req, res) => { // req é o pedido feito pelo front e o res é a resposta do back
    try { // executa o que estiver aqui dentro
        const dados = await buscarTodasAsMoedas(); // aqui o back pede os dados do rendimento.js | o await faz com que primeiro carregue todos os dados da API para depois entregar os resultados dentro da variável dados
        if (!dados || typeof dados !== 'object') { 
            // se os dados forem inválidos ou não existirem, retorna um erro para o front
            return res.status(500).json({ error: 'Dados inválidos recebidos do serviço de rendimento' });
        }
        res.json(dados); // converte a resposta da API em um "formato" que o front entende para enviar de volta
    } catch (error) { 
        // se ocorrer algum erro, ele será capturado aqui
        console.error('Erro ao buscar os dados do rendimento.js: ', error); // exibe o erro no console para debug
        res.status(500).json({ error: 'Erro ao obter rendimento' }); // o erro 500 é o erro interno do servidor
    }
};

//aqui vai chamar a função "buscarHistoricoMoeda" que está no services/rendimento.js
const { buscarHistoricoMoeda } = require('../services/rendimento'); // chama a função buscarHistoricoMoeda lá do rendimento.js

const getHistoricoMoeda = async (req, res) => {
    const { moeda, dias } = req.query; // aqui pega os parâmetros que foram enviados pelo front

    if (!moeda || !dias) {
        return res.status(400).json({erro: 'Parâmetros inválidos. Certifique-se de enviar "moeda" e "dias".'}); // se não tiver os parâmetros, retorna um erro 400
    }

    try {
        const historico = await buscarHistoricoMoeda(moeda, dias); // aqui o back pede os dados do rendimento.js | o await faz com que primeiro carregue todos os dados da API para depois entregar os resultados dentro da variável historico
        res.json(historico); // converte a resposta da API em um "formato" que o front entende para enviar de volta
    } catch (error) {
        console.error(`Erro ao buscar hitórico da moeda ${moeda}:`, error.message);
        res.status(500).json({ error: `Erro ao buscar histórico da moeda ${moeda}` }); // o erro 500 é o erro interno do servidor
    }
};

module.exports = { getRendimento, getHistoricoMoeda }; // exporta a função para ser usada em outras partes do projeto
