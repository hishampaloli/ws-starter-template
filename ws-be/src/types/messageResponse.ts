
export enum SupportedMessage {
    AddChat =  "ADD_CHAT",
    UpdateChat = "UPDATE_CHAT",
    RemoveRoom = "REMOVE_ROOM",
}

type MessagePayload = {
    roomId: string;
    message: string;
    name: string;
    chatId: string;
}

export type OutgoingMessage = {
    type: SupportedMessage.AddChat,
    payload: MessagePayload
} | {
    type: SupportedMessage.UpdateChat,
    payload: Partial<MessagePayload>
}| {
    type: SupportedMessage.RemoveRoom,
    payload: Partial<Omit<MessagePayload, 'chatId'>>
}
