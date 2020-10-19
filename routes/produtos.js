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
router.get('/:idProduto', (req, res, next) =>{
    const id = req.params.idProduto;
    res.status(200).send({
        mensagem: 'Testando GET id',
        idProduto: id
    });
});
//Insere
router.post('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Testando POST'
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