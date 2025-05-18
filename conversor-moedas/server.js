// server.js | meu servidor em back
// coordena as rotas, escuta as requisições e envia respostas.

const express = require('express'); //serve para "chamar" o express | é quem cria o servidor
const path = require('path'); //esse path é o modulo nativo do node, é com ele que se constrói caminhos de arquivos de forma segura 
const {getCotacao} = require('./src/controllers/cotacaoController'); //para importar a funçao de calcular a cotação
const {getRendimento} = require('./src/controllers/rendimentoControllers'); // importa a função que busca o rendimento

const app = express(); //cria o servidor do express | a variável app é usada para dps criar rotas e configurar o servidor
const PORT = 3000; //serve para definir qual é a "porta" que o servidor vai rodar | 3000 é um número comum em ambientes de desenvolvimento

app.use(express.json());  // para fazer com que o express entenda json
// middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); //serve para acessar os outros arquivos que estã na mesma pasta direto do navegador | roda o front
// o express.static() serve para qualquer arquivo estático que está na mesma pasta do server.js
// o _dirname é a variável que representa o caminho atual da pasta onde o server.js está
// o path.join(_dirname) serve para juntar esses caminhos corretamente e evitar vulnerabilidades

// aqui vai ser chamado a função que está no controller para que as conversões sejam feitas

//esse GET é quem envia os dados pela URL
app.get('/cotacao', getCotacao) // essa rota é quem chama a função do controller (cotacaoController.js)
//esse GET é quem só busca os dados, sem precisar enviar nenhum parâmentro
app.get('/rendimento',getRendimento) // essa rota usa a função do controller (rendimentoController.js)

// inicia o servidor (faz as requisições)
app.listen(PORT, () => { //aqui vem a a porta 3000 (PORT), assim quando estiver pronto, imprime no terminal que está funcionando.
    console.log(`Servidor rodando na porta ${PORT}`);
});