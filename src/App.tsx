import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StandingPage from 'pages/Standing'
import WaveFilePage from 'pages/WaveFile'

const App = () => {
  return (
    <BrowserRouter basename='mmd-3-fiber'>
      <Switch>
        <Route exact path='/' component={WaveFilePage} />
        <Route exact path='/standing' component={StandingPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
