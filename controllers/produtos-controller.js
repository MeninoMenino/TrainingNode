//MySQL
const mysql = require('../mysql');

exports.getProdutos = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM produtos';
        const result = await mysql.execute(query);
        //Resposta da requisição
        const response = {
            quantidade: result.length,
            produtos: result.map(produto => {
                return {
                    nome: produto.nome,
                    preco: produto.preco,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna o produto',
                        url: 'http://localhost:3000/produtos/' + produto.idprodutos
                    }
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getExclProdutos = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM produtos WHERE idprodutos = ?';
        const result = await mysql.execute(query, [req.params.idProduto]);

        if (result.length == 0) {
            return res.status(404).send({ message: 'Produto não encontrado' });
        }

        //Resposta da requisição
        const response = {
            idProduto: result[0].idprodutos,
            nome: result[0].nome,
            preco: result[0].preco,
            request: {
                tipo: 'GET',
                descricao: 'Retorna todos os produtos',
                url: 'http://localhost:3000/produtos/'
            }
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.postProdutos = async (req, res, next) => {
    try {
        const query = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';
        const result = await mysql.execute(query, [req.body.nome, req.body.preco]);
        //Resposta da requisição
        const response = {
            produtoCriado: {
                idProduto: result.insertId,
                nome: req.body.nome,
                preco: req.body.preco,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna o produto inserido',
                    url: 'url: http://localhost:3000/produtos/' + result.insertId
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.patchProdutos = async (req, res, next) => {
    try {
        const query = `UPDATE produtos
                          SET nome = ?,
                              preco = ?
                        WHERE idprodutos = ?`;

        const result = await mysql.execute(query,
            [req.body.nome, req.body.preco, req.params.idProduto]);

        const response = {
            produtoAlterado: {
                id: req.params.idprodutos,
                nome: req.body.nome,
                preco: req.body.preco
            },
            request: {
                tipo: 'GET',
                descricao: 'Retorna o produto alterado',
                url: 'http://localhost:3000/produtos/' + req.params.idprodutos
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.deleteProdutos = async (req, res, next) => {
    try {
        const query = 'DELETE FROM produtos WHERE idprodutos = ?';

        const result = await mysql.execute(query, [req.params.idProduto]);

        const response = {
            message: "Produto deletado",
            request: {
                tipo: 'POST',
                descricao: 'Insere um produto',
                url: 'http://localhost:3000/produtos/',
                body: {
                    nome: 'String',
                    preco: 'Number'
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send(error);
    }
}