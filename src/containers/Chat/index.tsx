import React from 'react'
import { eventNames } from '../../constants'
const io = require('socket.io-client')

const socket = io.connect('http://localhost:3000')
export interface SocketMessage {
  id:string;
  msg: string;
  timestamp: number;
}
socket.on(eventNames.CLIENTS_CONNECTED, (clients: any[]) => console.log(clients.length))
const Chat: React.FunctionComponent<{}> = () => {
  const [messagesList, setMessagesList] = React.useState([])

  const [msg, setMsg] = React.useState('')
  const sendMessage = (msg: string) => {
    socket.emit(eventNames.MESSAGE, msg)
    setMsg('')
  }
  React.useEffect(() => {
    socket.on(eventNames.MESSAGE, ({ id, msg, timestamp }: SocketMessage) => {
      console.log(socket.id, id, msg, timestamp)
      setMessagesList(messagesList.concat({ id, msg, timestamp }))
    })
    return () => socket.off(eventNames.MESSAGE)
  })

  return (
    <section>
      {messagesList.map(({ msg }, i) => (
        <p key={i}>{msg}</p>
      ))}
      <input type='text' value={msg} name='msg' onChange={(event) => setMsg(event.currentTarget.value)} />
      <button onClick={() => sendMessage(msg)}>Send Message!</button>
    </section>
  )
}

export default Chat
