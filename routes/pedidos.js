//Biblioteca HTTP
const express = require('express')
//Define as rotas dos endpoints
const router = express.Router();

//-------ENDPOINTS-------

//Lista
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Testando GET'
    });
});
//Busca
router.get('/:idPedidos', (req, res, next) =>{
    const id = req.params.idPedidos;
    res.status(200).send({
        mensagem: 'Testando GET id',
        idPedidos: id
    });
});
//Insere
router.post('/', (req, res, next) =>{

    const pedido = {
        idProduto: req.body.idProduto,
        quantidade: req.body.quantidade
    };

    res.status(201).send({
        mensagem: 'Pedido criado',
        pedidoCriado: pedido
    });
});
//Altera
router.patch('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'Testando PATCH'
    });
});
//Deleta
router.delete('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'Testando DELETE'
    });
});

module.exports = router;