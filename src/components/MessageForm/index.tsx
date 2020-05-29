import React from 'react'

import Button from '@/components/Button'
import SendIcon from '@/components/SendIcon'
import { SettingsContext } from '@/context/settings'
import { sendMessage } from '@/socket'
import { settingsProps } from '@/constants'

const MessageForm: React.ForwardRefRenderFunction<HTMLElement, {}> = (props, ref): JSX.Element => {
  const [msg, setMsg] = React.useState('')
  const send = (msgProps:{msg: string; userName:string}) => {
    if (!msg) return
    sendMessage(msgProps)
    setMsg('')
  }
  const { settings } = React.useContext(SettingsContext)
  const isSendEnterActivated = settings[settingsProps.SEND_ENTER] === 'true'

  const onKeyPress = (event: React.KeyboardEvent) => {
    const { key } = event
    const userName = settings[settingsProps.USER_NAME]
    if (isSendEnterActivated && key === 'Enter') send({ msg, userName })
  }

  return (
    <SettingsContext.Consumer>
      {({ settings }) => (
        <footer ref={ref} className='flex'>
          <input type='text' value={msg} className='grow-1' name='msg' {...{ onKeyPress }} onChange={(event) => setMsg(event.currentTarget.value)} />
          <Button color='primary' onClick={() => send({ msg, userName: settings.userName })}>
            <SendIcon />
          </Button>
        </footer>
      )}
    </SettingsContext.Consumer>
  )
}

export default React.forwardRef(MessageForm)
