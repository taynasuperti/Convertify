// server.js | meu servidor em back
// coordena as rotas, escuta as requisições e envia respostas.

const express = require('express'); //serve para "chamar" o express
const path = require('path'); //esse path é o modulo nativo do node, é com ele que se constrói caminhos de arquivos de forma segura 
const axios = require('axios');
const {converterMoeda} = require('./src/services/cotacao'); //para importar a funçao de cotação
const { error } = require('console');

const app = express(); //cria o servidor do express | a variável app é usada para dps criar rotas e configurar o servidor
const PORT = 3000; //serve para definir qual é a "porta" que o servidor vai rodar | 3000 é um número comum em ambientes de desenvolvimento

app.use(express.json());  // para fazer com que o express entenda json
// middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); //serve para acessar os outros arquivos que estã na mesma pasta direto do navegador | roda o front
// o express.static() serve para qualquer arquivo estático que está na mesma pasta do server.js
// o _dirname é a variável que representa o caminho atual da pasta onde o server.js está
// o path.join(_dirname) serve para juntar esses caminhos corretamente e evitar vulnerabilidades

// aqui vai ser criado a rota para converter as moedas
app.post('/converter', async (req, res) => {
    const {valor, de, para} = req.body;

    // aqui é comparação e verificação se há algum erro nos parâmentros
    if (!valor || !de || !para) {
        return res.status(400).send({error: 'Faltando parâmentros obrigatórios'});
    }

    try {
            //aqui vai ser onde a função de conversão vai ser chamada
    const valorConvertido = await converterMoeda(valor, de, para);

    if (valorConvertido == null) {
        return res.status(500).send({error:'Erro ao buscar a cotação'});
    }

    return res.json({valorConvertido});
    }  catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro interno no servidor' });
    }

});

// inicia o servidor (faz as requisições)
app.listen(PORT, () => { //aqui vem a a porta 3000 (PORT), assim quando estiver pronto, imprime no terminal que está funcionando.
    console.log(`Servidor rodando na porta ${PORT}`);
});