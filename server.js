//Aplicação
const app = require('./app');

const http = require('http');
//Porta
const port = process.env.PORT || 3000;
//Servidor
const server = http.createServer(app);
server.listen(port);