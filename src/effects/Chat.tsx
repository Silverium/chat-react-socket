import React from 'react'
import { eventNames } from '../constants'

import {
  socket,
  SocketMessage // eslint-disable-line no-unused-vars
} from '@/socket'

export const useChatHistory = (callback: (payload: SocketMessage[]) => void) => {
  React.useEffect(() => {
    socket.emit(eventNames.CHAT_HISTORY)
    socket.on(eventNames.CHAT_HISTORY, callback)

    return () => socket.off(eventNames.CHAT_HISTORY)
  },
  [])
}
export const useChatMessage = (callback: (payload: SocketMessage) => void) => {
  React.useEffect(() => {
    socket.on(eventNames.MESSAGE, callback)

    return () => socket.off(eventNames.MESSAGE)
  })
}

export const useUnreadMessages = (value:number = 0) : [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [unreadMsg, setUnreadMsg] = React.useState(value)
  useChatMessage(() => setUnreadMsg(unreadMsg + 1))
  return [unreadMsg, setUnreadMsg]
}
