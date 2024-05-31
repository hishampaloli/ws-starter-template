import express from 'express'
import WebSocket,{ WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(8080, () => {
    console.log('Server started on http://localhost:8080')
    
})

const wss = new WebSocketServer({ server: httpServer });
let userCount = 0;

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message',  (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log("user connected", userCount++);
  
  ws.send('Hello! Message From Server!!');
});