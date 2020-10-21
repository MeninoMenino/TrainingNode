//Biblioteca HTTP
const express = require('express');
//Define as rotas dos endpoints
const router = express.Router();
//Controller
const pedidosController = require('../controllers/pedidos-controller')

//-------ENDPOINTS-------

//Lista
router.get('/', pedidosController.getPedidos);
//Busca
router.get('/:idPedido', pedidosController.getExclPedidos);
//Insere
router.post('/', pedidosController.postPedidos);
//Altera
router.patch('/:idPedido', pedidosController.patchPedidos);
//Deleta
router.delete('/:idPedido', pedidosController.deletePedidos);

module.exports = router;