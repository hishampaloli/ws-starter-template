
import z from "zod";
import { DeleteRoomMessage, JoinRoomMessage, LeavRoomMessage, UserMessage } from "../validators/req.validator";

export enum SupportedMessage {
    JoinRoom =  "JOIN_ROOM",
    SendMessage = "SEND_MESSAGE",
    LeaveRoom = "LEAVE_ROOM",  
    DeleteRoom = "DELETE_ROOM",
}

export type IncomingMessage = {
    type: SupportedMessage.JoinRoom,
    payload: JoinRoomMessageType
} | {
    type: SupportedMessage.SendMessage,
    payload: UserMessageType
} | {
    type: SupportedMessage.LeaveRoom,
    payload: LeavRoomMessageType
} | {
    type: SupportedMessage.DeleteRoom,
    payload: DeleteRoomMessageType
}


export type JoinRoomMessageType = z.infer<typeof JoinRoomMessage>;
export type UserMessageType = z.infer<typeof UserMessage>;
export type LeavRoomMessageType = z.infer<typeof LeavRoomMessage>;
export type DeleteRoomMessageType = z.infer<typeof DeleteRoomMessage>;
