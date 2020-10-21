//MySQL
const mysql = require('../mysql').pool;

exports.getProdutos = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        //Caso dê erro de conexão
        if(error) {return res.status(500).send({error: error})}

        conn.query(
            'SELECT * FROM produtos',
            (error, result, fields) => {
                conn.release();

                //Caso dê erro
                if(error) {return res.status(500).send({error: error})}

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
            }
        );
    });
}

exports.getExclProdutos = (req, res, next) =>{
    const id = req.params.idprodutos;
    
    mysql.getConnection((error, conn) => {
        //Caso dê erro de conexão
        if(error) {return res.status(500).send({error: error})}

        conn.query(
            'SELECT * FROM produtos WHERE idprodutos = ?',
            [id],
            (error, result, fields) => {
                conn.release();

                //Caso dê erro
                if(error) {return res.status(500).send({error: error})}

                if(result.length == 0){
                    return res.status(404).send({
                        message: 'Produto não encontrado'
                    });
                }

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
            }
        );
    });
}

exports.postProdutos = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        //Caso dê erro de conexão
        if(error) {return res.status(500).send({error: error})}

        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
            [req.body.nome, req.body.preco],
            (error, result, fields) => {
                conn.release();

                //Caso dê erro
                if(error) {return res.status(500).send({error: error})}

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
            }
        );
    });
}

exports.patchProdutos = (req, res, next) =>{
    const id = req.params.idprodutos;

    mysql.getConnection((error, conn) => {
        //Caso dê erro de conexão
        if(error) {return res.status(500).send({error: error})}

        conn.query(
            `UPDATE produtos
               SET nome = ?,
                   preco = ?
             WHERE idprodutos = ?`,
            [req.body.nome, req.body.preco, id],
            (error, result, fields) => {
                //Caso dê erro
                if(error) {return res.status(500).send({error: error})}

                const response = {
                    produtoAlterado: {
                        id: id,
                        nome: req.body.nome,
                        preco: req.body.preco
                    },
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna o produto alterado',
                        url: 'http://localhost:3000/produtos/' + id
                    }
                }
                res.status(202).send(response);
            }
        );
    });
}

exports.deleteProdutos = (req, res, next) =>{
    const id = req.params.idprodutos;

    mysql.getConnection((error, conn) => {
       //Caso dê erro de conexão
       if(error) {return res.status(500).send({error: error})}

       conn.query(
           'DELETE FROM produtos WHERE idprodutos = ?',
           [id],
           (error, result, fields) => {
                //Caso dê erro
                if(error) {return res.status(500).send({error: error})}

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
           }
       ); 
    });
}