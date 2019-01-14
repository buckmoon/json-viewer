import React from 'react'
import compose from 'recompose/compose'
import stores from '../stores'
import { withProvider, withMuiThemeProvider } from '../hocs'
import theme from '../styles/theme'
import Viewer from '../components/Viewer'
import Header from '../components/Header'

import '../styles/main.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <Viewer />
    </div>
  )
}

export default compose(
  withProvider(stores),
  withMuiThemeProvider(theme)
)(App)
