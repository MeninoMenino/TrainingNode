//MySQL
const mysql = require('../mysql');

exports.getPedidos = async (req, res, next) => {
    try {
        const query = `SELECT * FROM pedidos
                          INNER JOIN produtos
                                  ON produtos.idprodutos = pedidos.idprodutos`;
        const result = await mysql.execute(query);

        const response = {
            quantidade: result.length,
            pedidos: result.map(pedido => {
                return {
                    idPedido: pedido.idpedidos,
                    quantidade: pedido.quantidade,
                    produto: {
                        idProduto: pedido.idprodutos,
                        nome: pedido.nome,
                        preco: pedido.preco
                    },
                    precoTotal: (pedido.preco * pedido.quantidade),
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna o pedido',
                        url: 'http://localhost:3000/pedidos/' + pedido.idpedidos
                    }
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.getExclPedidos = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM pedidos WHERE idpedidos = ?';
        const result = await mysql.execute(query, [req.params.idPedido]);

        if (result.length == 0) {
            return res.status(404).send({ message: 'Pedido não encontrado' });
        }

        const response = {
            idPedido: result[0].idpedidos,
            quantidade: result[0].quantidade,
            idProduto: result[0].idprodutos,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os pedidos',
                url: 'http://localhost:3000/pedidos/'
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.postPedidos = async (req, res, next) => {
    try {
        const queryProdutos = 'SELECT * FROM produtos WHERE idprodutos = ?';
        const resultProdutos = await mysql.execute(queryProdutos, [req.body.idProduto]);

        if (resultProdutos.length == 0) {
            return res.status(404).send({ message: 'Produto não encontrado' });
        }

        const queryPedidos = 'INSERT INTO pedidos (quantidade, idprodutos) VALUES (?, ?)';
        const result = await mysql.execute(queryPedidos, [req.body.quantidade, req.body.idProduto]);

        const response = {
            message: 'Pedido criado',
            pedido: {
                idPedido: result.insertId,
                quantidade: req.body.quantidade,
                idProduto: req.body.idProduto
            },
            request: {
                tipo: 'GET',
                descricao: 'Retorna o pedido',
                url: 'url: http://localhost:3000/pedidos/' + result.insertId
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.patchPedidos = async (req, res, next) => {
    try {
        const query = `UPDATE pedidos
                          SET quantidade = ?,
                              idprodutos = ?
                        WHERE idpedidos = ?`;

        const pedido = {
            id: req.params.idPedido,
            quantidade: req.body.quantidade,
            idProduto: req.body.idProduto
        }

        const result = await mysql.execute(query, [pedido.quantidade, pedido.idProduto, pedido.id]);

        const response = {
            message: 'Pedido alterado',
            pedido: {
                idPedido: pedido.id,
                quantidade: pedido.quantidade,
                idProduto: pedido.idProduto
            },
            request: {
                tipo: 'GET',
                descricao: 'Retorna o pedido alterado',
                url: 'http://localhost:3000/pedidos/' + pedido.id
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.deletePedidos = async (req, res, next) => {
    try {
        const query = 'DELETE FROM pedidos WHERE idpedidos = ?';

        const result = await mysql.execute(query, [req.params.idPedido]);

        const response = {
            message: "Pedido deletado",
            request: {
                tipo: 'POST',
                descricao: 'Insere um pedido',
                url: 'http://localhost:3000/pedidos/',
                body: {
                    quantidade: 'Number',
                    idProduto: 'Number'
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}