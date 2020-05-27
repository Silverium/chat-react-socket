import React from 'react'
import {
  SocketMessage, // eslint-disable-line no-unused-vars
  sendMessage,
  socket
} from '@/socket'

import { SettingsContext } from '@/context/settings'
import { settingsProps } from '@/constants'
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
    const userName = settings[settingsProps.USER_NAME]
    const isCtrlEnterActivated = settings[settingsProps.SEND_ENTER] === 'true'
    if (isCtrlEnterActivated && key === 'Enter' && ctrlKey) send({ msg, userName })
  }
  const [msgsHeight, setMsgsHeight] = React.useState(0)
  const footerRef = React.useRef(null)
  const msgsRef = React.useRef(null)
  React.useEffect(() => {
    setMsgsHeight(bodyHeight - footerRef.current.clientHeight)
    msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  })
  // TODO: extract messages section with  ul/li formatting
  // TODO: transform and extract "send" section into a small form
  return (
    <SettingsContext.Consumer>
      {({ settings, timeFormatter }) => (
        <section>
          <ul ref={msgsRef} style={{ height: msgsHeight }} className='overflow-y-auto'>

            {messagesList.map(({ userName, msg, id, timestamp }, i) => (
              <li key={i} className={`m-3 ${socket.id === id ? 'text-right' : 'text-left'}`}>
                <div className='my-2'>{userName || id}, {timeFormatter(timestamp)}</div>
                <span className={`p-1 rounded-4 border-1 border-color-${settings[settingsProps.THEME]}`}> {msg}</span>
              </li>
            ))}
          </ul>

          <footer ref={footerRef} className='flex'>
            <input type='text' value={msg} className='grow-1' name='msg' {...{ onKeyPress }} onChange={(event) => setMsg(event.currentTarget.value)} />
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
