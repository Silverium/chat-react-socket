import { createServer } from 'http'
import { Socket, Server } from 'socket.io' // eslint-disable-line no-unused-vars
import path from 'path'
import { eventNames } from '../src/constants'
import { SocketMessage } from '../src/socket' // eslint-disable-line no-unused-vars
import express from 'express'
import { MAX_MESSAGES } from './settings'
const app = express()
const server = createServer(app)
const io = require('socket.io')(server)
export const connectedClients = new Map()
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))
app.get('/public/locales/:lng/:file', (req, res) => {
  const { lng, file } = req.params
  res.sendFile(path.join(__dirname, '../public/locales', lng, file))
})

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
export const onMessage = (client: Socket, io: Server) => (msgProps:{msg: string; userName:string}) => {
  const msgObject = { id: client.id, ...msgProps, timestamp: Date.now() }
  chatHistory.push(msgObject)
  if (chatHistory.length > MAX_MESSAGES) chatHistory.shift()
  io.emit(eventNames.MESSAGE, msgObject)
}
export const onChatHistory = (client: Socket) => () => {
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
  console.info('\x1b[40m\x1b[32m%s\x1b[0m', 'listening on port 3000') // Green over Black comment
})
