//Biblioteca HTTP
const express = require('express')
//Define as rotas dos endpoints
const router = express.Router();
//Controller
const produtosController = require('../controllers/produtos-controller')

//-------ENDPOINTS-------

//Lista
router.get('/', produtosController.getProdutos);
//Busca
router.get('/:idprodutos', produtosController.getExclProdutos);
//Insere
router.post('/', produtosController.postProdutos);
//Altera
router.patch('/:idprodutos', produtosController.patchProdutos);
//Deleta
router.delete('/:idprodutos', produtosController.deleteProdutos);

module.exports = router;