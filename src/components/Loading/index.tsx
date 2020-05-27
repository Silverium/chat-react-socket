import React from 'react'
import './Loading.scss'
import times from 'lodash-es/times'
const Loading: React.FunctionComponent<{}> = () => (
  <div className='Loading centered'>
    <div className='sk-chase'>
      {times(6, (i) => (<div key={i} className='sk-chase-dot' />))}
    </div>
  </div>
)

export default Loading
