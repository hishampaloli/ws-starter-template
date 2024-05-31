
import z from "zod";


export const JoinRoomMessage = z.object({
    name: z.string(),
    userId: z.string(), 
    roomId: z.string(),
})

export const UserMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    message: z.string()
})

export const LeavRoomMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    chatId: z.string()
})
