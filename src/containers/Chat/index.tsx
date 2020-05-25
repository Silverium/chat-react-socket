import React from 'react'

import { useChatMessage, SocketMessage, sendMessage, useChatHistory } from '../../effects/Chat' // eslint-disable-line no-unused-vars
import { SettingsContext } from '../../context/settings'
import { settings as settingsConst } from '../../constants/'
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
  const { settings } = React.useContext(SettingsContext)
  const onKeyPress = (event: React.KeyboardEvent) => {
    const { key, ctrlKey } = event
    const userName = settings[settingsConst.USER_NAME]
    const isCtrlEnterActivated = settings[settingsConst.SEND_ENTER] === 'true'
    if (isCtrlEnterActivated && key === 'Enter' && ctrlKey) send({ msg, userName })
  }
  // TODO: extract messages section with  ul/li formatting
  // TODO: transform and extract "send" section into a small form
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
          <textarea value={msg} name='msg' {...{ onKeyPress }} onChange={(event) => setMsg(event.currentTarget.value)} />
          <button onClick={() => send({ msg, userName: settings.userName })}>Send Message!</button>
        </section>
      )}
    </SettingsContext.Consumer>
  )
}

export default Chat
