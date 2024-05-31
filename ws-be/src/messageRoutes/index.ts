import WebSocket from "ws"
import { IncomingMessage, SupportedMessage } from "../types/messageRequest"

const routeMessage = (ws: WebSocket, message: IncomingMessage) => {
    if(message.type === SupportedMessage.JoinRoom) {

    }

    if(message.type === SupportedMessage.SendMessage) {

    }

    if(message.type === SupportedMessage.LeaveRoom) {

    }
    
}
export { routeMessage }