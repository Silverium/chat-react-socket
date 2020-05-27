import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import Loading from './src/components/Loading'

const App = React.lazy(() => import(/* webpackChunkName: "content"  */ './src/containers/App'))

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
  , document.getElementById('chatApp'))
