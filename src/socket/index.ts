import { eventNames } from '@/constants'
import io from 'socket.io-client'

export const socket = io.connect('http://localhost:3000')
socket.on(eventNames.CLIENTS_CONNECTED, console.log)
export interface SocketMessage {
  id: string;
  msg: string;
  userName?: string;
  timestamp?: number;
}

export const sendMessage = (msgProps:{msg: string; userName:string}) => {
  socket.emit(eventNames.MESSAGE, msgProps)
}
