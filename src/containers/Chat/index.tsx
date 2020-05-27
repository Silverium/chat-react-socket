import React from 'react'
import {
  SocketMessage, // eslint-disable-line no-unused-vars
  sendMessage,
  socket
} from '@/socket'

import { SettingsContext } from '@/context/settings'
import { settingsProps as settingsConst } from '@/constants'
import SendIcon from '@/components/SendIcon'
import Button from '@/components/Button'

const Chat: React.FunctionComponent<{messagesList:SocketMessage[], bodyHeight: number}> = ({ messagesList, bodyHeight }) => {
  const [msg, setMsg] = React.useState('')
  const send = (msgProps:{msg: string; userName:string}) => {
    if (!msg) return
    sendMessage(msgProps)
    setMsg('')
  }
  const { settings } = React.useContext(SettingsContext)
  const onKeyPress = (event: React.KeyboardEvent) => {
    const { key, ctrlKey } = event
    const userName = settings[settingsConst.USER_NAME]
    const isCtrlEnterActivated = settings[settingsConst.SEND_ENTER] === 'true'
    if (isCtrlEnterActivated && key === 'Enter' && ctrlKey) send({ msg, userName })
  }
  const [msgsHeight, setMsgsHeight] = React.useState(0)
  const footerRef = React.useRef(null)
  React.useEffect(() => {
    setMsgsHeight(bodyHeight - footerRef.current.clientHeight)
  })
  // TODO: extract messages section with  ul/li formatting
  // TODO: transform and extract "send" section into a small form
  return (
    <SettingsContext.Consumer>
      {({ settings, timeFormatter }) => (
        <section style={{ height: bodyHeight }} className='overflow-y-auto'>
          <ul style={{ height: msgsHeight }} className='overflow-y-auto'>

            {messagesList.map(({ userName, msg, id, timestamp }, i) => (
              <li key={i} className={`m-3 ${socket.id === id ? 'text-right' : 'text-left'}`}>
                <div>{userName || id}, {timeFormatter(timestamp)}</div>
                <p> {msg}</p>
              </li>
            ))}
          </ul>

          <footer ref={footerRef} className=''>
            <input type='text' value={msg} name='msg' {...{ onKeyPress }} onChange={(event) => setMsg(event.currentTarget.value)} />
            <Button color='primary' onClick={() => send({ msg, userName: settings.userName })}>
              <SendIcon />
            </Button>
          </footer>
        </section>
      )}
    </SettingsContext.Consumer>
  )
}

export default Chat
