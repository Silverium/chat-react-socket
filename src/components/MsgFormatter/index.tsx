import React from 'react'

import { replaceStringWithEmoji } from '@/helpers'
import anchorme from 'anchorme'
import compact from 'lodash-es/compact'
export interface MsgFormatterProps {
  msg: string
  hasSmileys?: boolean
  hasYoutubeLinks?: boolean
  hasImages?: boolean
}

const MsgFormatter: React.FunctionComponent<MsgFormatterProps> = ({ msg, hasSmileys, hasYoutubeLinks, hasImages }): JSX.Element => {
  const textReplacer = (text: string) => {
    let result = text
    result = anchorme({
      input: text,
      options: {
        exclude: false,
        specialTransform: compact([
          hasImages && {
            test: /.*\.(png|jpg|gif)$/,
            transform: s => `<img src="${s.startsWith('https://') ? s : `https://${s}`}">`

          },
          hasYoutubeLinks && {
            test: /youtube\.com\/watch\?v=/,
            transform: str => `<iframe src="https://www.youtube.com/embed/${str.replace(
                          /.*watch\?v=(.*)$/,
                          '$1'
                      )}"/>`
          }
        ])
      }
    })
    if (hasSmileys) {
      result = replaceStringWithEmoji(result)
      console.log('%cvariable: result please', 'background-color: lime;', result)
    }
    return result
  }
  return (
    <div className='MsgFormatter' dangerouslySetInnerHTML={{ __html: textReplacer(msg) }} />
  )
}

export default MsgFormatter
