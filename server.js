const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

let clients = [];

server.on('connection', (socket) => {
  clients.push(socket);

  // Écoute des messages du client
  socket.on('message', (message) => {
    // Diffuser à tous les autres clients
    clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Nettoyage des connexions fermées
  socket.on('close', () => {
    clients = clients.filter(client => client !== socket);
  });
});

console.log("Serveur WebSocket démarré sur ws://localhost:8080");