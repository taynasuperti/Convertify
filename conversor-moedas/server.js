// server.js

const express = require('express'); //serve para "chamar" o express
const path = require('path'); //esse path é o modulo nativo do node, é com ele que se constrói caminhos de arquivos de forma segura 
const app = express(); //cria uma instancia do express | a variável app é usada para dps criar rotas e configurar o servidor
const PORT = 3000; //serve para definir qual é a "porta" que o servidor vai rodar | 3000 é um número comum em ambientes de desenvolvimento

// middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname))); //serve para acessar os outros arquivos que estã na mesma pasta direto do navegador
// o express.static() serve para qualquer arquivo estático que está na mesma pasta do server.js
// o _dirname é a variável que representa o caminho atual da pasta onde o server.js está
// o path.join(_dirname) serve para juntar esses caminhos corretamente e evitar vulnerabilidades

// aqui define a rota principal
app.get('/', (req, res) => { // req é o request (pedido feito pelo navegador) e o res é a resposta do servidor
    res.sendFile(path.join(__dirname, 'index.html')); // res.sendFile indica que quando alguém acessar a "raiz" (/) é para enviar o arquivo index.html
});

// inicia o servidor (faz as requisições)
app.listen(PORT, () => { //aqui vem a a porta 3000 (PORT), assim quando estiver pronto, imprime no terminal que está funcionando.
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});