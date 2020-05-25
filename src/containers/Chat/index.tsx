import React from 'react'

import { useChatMessage, SocketMessage, sendMessage, useChatHistory } from '../../effects/Chat' // eslint-disable-line no-unused-vars

const Chat: React.FunctionComponent<{}> = () => {
  const [messagesList, setMessagesList] = React.useState([])
  useChatHistory((history) => {
    setMessagesList(history)
  })
  const [msg, setMsg] = React.useState('')
  const send = (msg: string) => {
    sendMessage(msg)
    setMsg('')
  }
  useChatMessage((msgProps: SocketMessage) => {
    setMessagesList(messagesList.concat(msgProps))
  })

  return (
    <section>
      {messagesList.map(({ msg, id }, i) => (
        <p key={i}>{id}: {msg}</p>
      ))}
      <input type='text' value={msg} name='msg' onChange={(event) => setMsg(event.currentTarget.value)} />
      <button onClick={() => send(msg)}>Send Message!</button>
    </section>
  )
}

export default Chat
