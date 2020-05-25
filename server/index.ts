import { createServer } from 'http'
import { Socket, Server } from 'socket.io' // eslint-disable-line no-unused-vars

import { eventNames } from '../src/constants'
import { SocketMessage } from '../src/effects/Chat' // eslint-disable-line no-unused-vars
const server = createServer()
const io = require('socket.io')(server)
export const connectedClients = new Map()

const chatHistory: SocketMessage[] = []
export const onConnect = (client: Socket, io: Server) => {
  const { id } = client
  console.info('\x1b[32m%s\x1b[0m', id) // green comment
  connectedClients.set(id, { id })
  const connectedUsers = Array.from(connectedClients.entries())
  io.emit(eventNames.CLIENTS_CONNECTED, { connectedUsers, chatHistory })
}
export const onDisconnect = (client: Socket, io: Server) => () => {
  const { id } = client
  console.info('\x1b[31m%s\x1b[0m', id) // red comment
  connectedClients.delete(id)
  io.emit(eventNames.CLIENTS_CONNECTED, Array.from(connectedClients.entries()))
}
export const onSetName = (client: Socket, io: Server) => (name:string) => {
  const { id } = client
  const user = connectedClients.get(id)
  user.name = name
  io.emit(eventNames.CLIENTS_CONNECTED, Array.from(connectedClients.entries()))
}
export const onMessage = (client: Socket, io: Server) => (msg: string) => {
  const msgProps = { id: client.id, msg, timestamp: Date.now() }
  chatHistory.push(msgProps)
  io.emit(eventNames.MESSAGE, msgProps)
}
export const onChatHistory = (client: Socket) => () => {
  console.info('\x1b[36m%s\x1b[0m', 'history retrieved') // cyan comment

  client.emit(eventNames.CHAT_HISTORY, chatHistory)
}
io.on('connection', function (client: Socket) {
  onConnect(client, io)
  client.on(eventNames.SET_NAME, onSetName(client, io))

  client.on(eventNames.MESSAGE, onMessage(client, io))

  client.on(eventNames.CHAT_HISTORY, onChatHistory(client))

  client.on('disconnect', onDisconnect(client, io))

  client.on('error', function (err: Error) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

server.listen(3000, () => {
  console.info('\x1b[43m\x1b[30m%s\x1b[0m', 'listening on port 3000') // Black over Yellow comment
})
