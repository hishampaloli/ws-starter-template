import WebSocket from "ws"
import { IncomingMessage, SupportedMessage } from "../types/messageRequest"
import { UserController } from "./userController"
import { InMemoryStore } from "../storage/InMemoryStore";
import { OutgoingMessage, SupportedMessage as OutgoingSupportedMessages } from "../types/messageResponse";

const userController = new UserController();
const store = new InMemoryStore()

const routeMessage = (ws: WebSocket, message: IncomingMessage) => {
    console.log(message.type);
    
    if(message.type === SupportedMessage.JoinRoom) {
        const { roomId, userId, name } = message.payload;
        userController.addUser(name, userId, roomId, ws);
    }

    if(message.type === SupportedMessage.SendMessage) {
        const { roomId, userId, message: userMessage } = message.payload;
        let user = userController.getUser(roomId, userId);
        if(!user) {
            console.error("User not found");
            return;
        }        
        let chat = store.addChat(userId, user?.name, roomId, userMessage)!
        const outgoingPayload: OutgoingMessage= {
            type: OutgoingSupportedMessages.AddChat,
            payload: {
                chatId: chat.id,
                roomId,
                message: userMessage,
                name: user.name,
            }
        }
        userController.broadcast(roomId, userId, outgoingPayload);
    }

    if(message.type === SupportedMessage.LeaveRoom) {
        const { roomId, userId } = message.payload;
        userController.removeUser(roomId, userId);
    }
    
    if(message.type === SupportedMessage.DeleteRoom) {
        const { roomId, userId } = message.payload;
        const user = userController.getUser(roomId, userId);
        if(!user) {
            console.error("User not found");
            return;
        }
        store.clearRoomChat(roomId);
        const outgoingPayload: OutgoingMessage= {
            type: OutgoingSupportedMessages.RemoveRoom,
            payload: {
                roomId,
                message: `The room has been deleted by ${user?.name}`,
                name: user?.name,
            }
        }
        userController.removeRoom(roomId, userId, outgoingPayload);
    }
}
export { routeMessage }