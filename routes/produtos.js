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
router.get('/:idProduto', produtosController.getExclProdutos);
//Insere
router.post('/', produtosController.postProdutos);
//Altera
router.patch('/:idProduto', produtosController.patchProdutos);
//Deleta
router.delete('/:idProduto', produtosController.deleteProdutos);

module.exports = router;