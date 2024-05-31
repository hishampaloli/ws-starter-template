import express from 'express'
import WebSocket, { WebSocketServer } from 'ws'
import { errorLogger, originIsAllowed } from './utils'
import { routeMessage } from './messageRoutes'


const app = express()
const httpServer = app.listen(8080, () => {
  console.log('Server started on http://localhost:8080')

})

const wss = new WebSocketServer({ server: httpServer });
let userCount = 0;

wss.on('connection', (ws, req) => {

  ws.on('error', errorLogger);
  const clientOrigin = req.headers.origin;

  if (!originIsAllowed(clientOrigin!)) {
    ws.close(1008, 'Origin not allowed');
    return;
  }

  ws.on('message', (data, isBinary) => {

    if (!isBinary) {
      try {
        routeMessage(ws, JSON.parse(data.toString()))
      } catch (error) {
        console.log(error);
      }
    }
  });

  console.log("user connected", userCount++);

  ws.send('Hello! Message From Server!!');
});