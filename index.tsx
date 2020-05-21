import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import Loading from './src/components/Loading'
import App from './src/containers/App'
import './src/i18n'

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
  , document.getElementById('chatApp'))
