import { WebSocket } from "ws";
import { OutgoingMessage } from "../types/messageResponse";

interface User {
    name: string;
    id: string;
    conn: WebSocket;
}

interface Room {
    users: User[]
}

export class UserController {
    private rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map<string, Room>()
    }

    addUser(name: string, userId: string, roomId: string, ws: WebSocket) {
        let user = {
            id: userId,
            name,
            conn: ws
        }
        this.rooms.get(roomId) ? 
        (!this.getUser(roomId, userId) && this.rooms.get(roomId)?.users.push(user))
        : this.rooms.set(roomId, { users: [user] })

        ws.on('close', (reasonCode, description) => {
            this.removeUser(roomId, userId);
        });
        console.log(this.rooms);
        
    }

    removeUser(roomId: string, userId: string) {
        const users = this.rooms.get(roomId)?.users;
        if (users) {
            users.filter(({ id }) => id !== userId);
        }
    }


    getUser(roomId: string, userId: string): User | null {
        const user = this.rooms.get(roomId)?.users.find((({ id }) => id === userId));
        return user ?? null;
    }

    broadcast(roomId: string, userId: string, message: OutgoingMessage) {
        const user = this.getUser(roomId, userId);
        if (!user) {
            console.error("User not found");
            return;
        }

        const room = this.rooms.get(roomId);
        if (!room) {
            console.error("Rom rom not found");
            return;
        }        
        room.users.forEach(({ conn, id }) => {
            // avoids self broadcasting
            if (id === userId) {
                return;
            }
            conn.send(JSON.stringify(message));
        })
    }

    removeRoom(roomId: string, userId: string, message: OutgoingMessage) {
        let room = this.rooms.get(roomId);
        room?.users.forEach(({ conn,id }) => {
            if (id === userId) {
                return;
            }
            conn.send(JSON.stringify(message));
        })
        this.rooms.delete(roomId);
        console.log(this.rooms);
        
    }
}