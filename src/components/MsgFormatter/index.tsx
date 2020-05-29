import React from 'react'

import { replaceStringWithEmoji } from '@/helpers'
import anchorme from 'anchorme'
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
    result = anchorme({
      input: text,
      options: {
        exclude: false,
        specialTransform: [
          {
            test: /.*\.(png|jpg|gif)$/,
            transform: s => `<img src="${s.startsWith('https://') ? s : `https://${s}`}">`

          },
          {
            test: /youtube\.com\/watch\?v=/,
            transform: str => `<iframe src="https://www.youtube.com/embed/${str.replace(
                          /.*watch\?v=(.*)$/,
                          '$1'
                      )}"/>`
          }
        ]
      }
    })

    return result
  }
  return (
    <div className='MsgFormatter' dangerouslySetInnerHTML={{ __html: textReplacer(msg) }} />
  )
}

export default MsgFormatter
