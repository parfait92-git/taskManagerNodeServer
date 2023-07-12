const { exec } = require('child_process');

// Commande pour lancer le serveur backend
const backendCommand = 'node ./src/app.ts';

// Commande pour lancer le serveur WebSocket
const websocketCommand = 'node ./src/websocket/server.websocket.ts';

// Exécution des deux commandes en parallèle
exec(`${backendCommand} & ${websocketCommand}`, (error: any, stdout: any, stderr: any) => {
  if (error) {
    console.error(`Erreur lors du démarrage des serveurs : ${error}`);
    return;
  }

  console.log('Serveurs démarrés avec succès !');
});
