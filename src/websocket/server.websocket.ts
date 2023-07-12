const { server: WebSocketServer } = require('websocket');

const http = require('http');

const server = http.createServer((request: any, response: any) => {
  console.log('Requête reçue.');
});

const wsServer = new WebSocketServer({
  httpServer: server,
});

wsServer.on('request', (request: any) => {
  const connection = request.accept(null, request.origin);
  console.log('Connexion WebSocket établie.');

  connection.on('message', (message: any) => {
    console.log('Message reçu :', message.utf8Data);
  });

  connection.on('close', (reasonCode: any, description: any) => {
    console.log('Connexion WebSocket fermée.');
  });
});

server.listen(3001, () => {
  console.log('Serveur WebSocket en cours d\'exécution sur le port 3001.');
});
