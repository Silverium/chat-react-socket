import React from 'react'
import {
  SocketMessage, // eslint-disable-line no-unused-vars
  socket
} from '@/socket'

import { SettingsContext } from '@/context/settings'
import { settingsProps, stringBooleans } from '@/constants'
import MessageForm from '@/components/MessageForm'
import MsgFormatter from '@/components/MsgFormatter'

const Chat: React.FunctionComponent<{messagesList:SocketMessage[], bodyHeight: number}> = ({ messagesList, bodyHeight }) => {
  const [msgsHeight, setMsgsHeight] = React.useState(0)
  const footerRef = React.useRef(null)
  const msgsRef = React.useRef(null)
  React.useEffect(() => {
    setMsgsHeight(bodyHeight - footerRef.current.clientHeight)
    msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  })
  // TODO: extract messages section with  ul/li formatting
  return (
    <SettingsContext.Consumer>
      {({ settings, timeFormatter }) => (
        <section>
          <ul ref={msgsRef} style={{ height: msgsHeight }} className='overflow-y-auto'>
            {messagesList.map(({ userName, msg, id, timestamp }, i) => (
              <li key={i} className={`m-3 ${socket.id === id ? 'text-right' : 'text-left'}`}>
                <div className='my-2'>{userName || id}, {timeFormatter(timestamp)}</div>
                <div className={`d-inline-block p-1 rounded-4 border-1 border-color-${socket.id === id ? 'primary' : settings[settingsProps.THEME]} ${socket.id === id ? 'ml-5' : 'mr-5'}`}>
                  <MsgFormatter {...{ msg, hasSmileys: settings[settingsProps.SMILEYS] === stringBooleans.true }} />
                </div>
              </li>
            ))}
          </ul>
          <MessageForm ref={footerRef} />
        </section>
      )}
    </SettingsContext.Consumer>
  )
}

export default Chat
