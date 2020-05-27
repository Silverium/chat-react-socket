import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import Loading from './src/components/Loading'

import './src/i18n'
// import App from './src/containers/App'
const App = React.lazy(() => import('./src/containers/App'))

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
  , document.getElementById('chatApp'))
