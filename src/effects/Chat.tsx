import React from 'react'
import { eventNames } from '../constants'
const io = require('socket.io-client')

const socket = io.connect('http://localhost:3000')

export interface SocketMessage {
  id: string;
  msg: string;
  timestamp: number;
}
socket.on(eventNames.CLIENTS_CONNECTED, console.log)

export const useChatHistory = (callback: (payload: SocketMessage[]) => void) => {
  React.useEffect(() => {
    socket.emit(eventNames.CHAT_HISTORY)
    socket.on(eventNames.CHAT_HISTORY, callback)

    return () => socket.off(eventNames.CHAT_HISTORY)
  },
  [])
}
export const useChatMessage = (callback: (payload: SocketMessage) => void) => {
  React.useEffect(() => {
    socket.on(eventNames.MESSAGE, callback)

    return () => socket.off(eventNames.MESSAGE)
  })
}
export const sendMessage = (msg: string) => {
  socket.emit(eventNames.MESSAGE, msg)
}
