import React from 'react'

import { useChatMessage, SocketMessage, sendMessage, useChatHistory } from '../../effects/Chat' // eslint-disable-line no-unused-vars
import { SettingsContext } from '../../context/settings'

const Chat: React.FunctionComponent<{}> = () => {
  const [messagesList, setMessagesList] = React.useState([])
  useChatHistory((history) => {
    setMessagesList(history)
  })
  const [msg, setMsg] = React.useState('')
  const send = (msgProps:{msg: string; userName:string}) => {
    sendMessage(msgProps)
    setMsg('')
  }
  useChatMessage((msgProps: SocketMessage) => {
    setMessagesList(messagesList.concat(msgProps))
  })

  return (
    <SettingsContext.Consumer>
      {({ settings, timeFormatter }) => (
        <section>
          {messagesList.map(({ userName, msg, id, timestamp }, i) => (
            <div key={i}>
              <div>{userName || id}, {timeFormatter(timestamp)}</div>
              <p> {msg}</p>
            </div>
          ))}
          <input type='text' value={msg} name='msg' onChange={(event) => setMsg(event.currentTarget.value)} />
          <button onClick={() => send({ msg, userName: settings.userName })}>Send Message!</button>
        </section>
      )}
    </SettingsContext.Consumer>
  )
}

export default Chat
