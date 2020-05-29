import React from 'react'

import { replaceStringWithEmoji } from '@/helpers'

export interface MsgFormatterProps {
  msg: string
  hasSmileys?: boolean
}

const MsgFormatter: React.FunctionComponent<MsgFormatterProps> = ({ msg, hasSmileys }): JSX.Element => {
  const textReplacer = (text: string) => {
    let result = text
    if (hasSmileys) {
      result = replaceStringWithEmoji(result)
    }

    return result
  }
  return (
    <div>
      {textReplacer(msg)}
    </div>
  )
}

export default MsgFormatter
