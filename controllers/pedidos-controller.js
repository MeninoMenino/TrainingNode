//MySQL
const mysql = require('../mysql').pool;

exports.getPedidos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        //Caso dê erro de conexão
        if(error){return res.status(500).send({error: error})}
        conn.query(
            `SELECT * FROM pedidos
                INNER JOIN produtos
                        ON produtos.idprodutos = pedidos.idprodutos`,
            (error, result, fields) => {
                conn.release();

                //Caso dê erro
                if(error){return res.status(500).send({error: error})}

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
            }
        );
    });
}

exports.getExclPedidos = (req, res, next) =>{
    const id = req.params.idPedidos;
    
    mysql.getConnection((error, conn) => {
        //Caso dê erro de conexão
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM pedidos WHERE idpedidos = ?',
            [id],
            (error, result, fields) => {
                conn.release();
                
                //Caso dê erro
                if(error){return res.status(500).send({error: error})}

                if(result.length == 0){
                    return res.status(404).send({message: 'Pedido não encontrado'});
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
            }
        );
    });
}

exports.postPedidos = (req, res, next) =>{
    
    const pedido = {
        quantidade : req.body.quantidade,
        idProduto : req.body.idProduto
    }

    mysql.getConnection((error, conn) => {
        //Caso dê erro de conexão
        if(error){return res.status(500).send({error: error})}

        //Confere se o id do produto existe
        conn.query(
            'SELECT * FROM produtos WHERE idprodutos = ?',
            pedido.idProduto,
            (error, result, fields) => {
                //Caso dê erro
                if(error){return res.status(500).send({error: error})}

                if(result.length == 0){
                    conn.release();
                    return res.status(404).send({erro: 'Produto não encontrado'});
                }

                conn.query(
                    'INSERT INTO pedidos (quantidade, idprodutos) VALUES (?, ?)',
                    [pedido.quantidade, pedido.idProduto],
                    (error, result, fields) => {
                        conn.release();
        
                        //Caso dê erro
                        if(error){return res.status(500).send({error: error})}
        
                        const response = {
                            message: 'Pedido criado',
                            pedido: {
                                idPedido: result.insertId,
                                quantidade: pedido.quantidade,
                                idProduto: pedido.idProduto
                            },
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna o pedido',
                                url: 'url: http://localhost:3000/pedidos/' + result.insertId
                            }
                        }
                        return res.status(201).send(response);
                    }
                )
            }
        );
    });
}

exports.patchPedidos = (req, res, next) =>{
    const pedido = {
        id: req.params.idPedido,
        quantidade: req.body.quantidade,
        idProduto: req.body.idProduto
    }

    mysql.getConnection((error, conn) => {
        //Caso dê erro de conexão
        if(error){return res.status(500).send({error: error})}

        conn.query(
            `UPDATE pedidos
                SET quantidade = ?,
                    idprodutos = ?
              WHERE idpedidos = ?`,
            [pedido.quantidade, pedido.idProduto, pedido.id],
            (error, result, fields) => {
                //Caso dê erro
                if(error){return res.status(500).send({error: error})}

                conn.release();

                const response = {
                    message: 'Pedido alterado',
                    pedido: {
                        idPedido: result.idpedidos,
                        quantidade: result.quantidade,
                        idProduto: result.idprodutos
                    },
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna o pedido alterado',
                        url: 'http://localhost:3000/pedidos/' + pedido.id
                    }
                }
                return res.status(202).send(response);
            }
        );
    });
}

exports.deletePedidos = (req, res, next) =>{
    const id = req.params.idPedido;

    mysql.getConnection((error, conn) => {
        //Caso dê erro de conexão
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'DELETE FROM pedidos WHERE idpedidos = ?',
            [id],
            (error, result, fields) => {
                //Caso dê erro
                if(error){return res.status(500).send({error: error})}

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
            }
        );
    });
}