const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

//Rotas dos endpoints
const rotaProdutos = require('./routes/produtos');
app.use('/produtos', rotaProdutos);
const rotaPedidos = require('./routes/pedidos');
app.use('/pedidos', rotaPedidos);

//Caso não encontre rota, seta um erro e chama a próxima função
app.use((req, res, next) => {
    const error = new Error('Não encontrado');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;