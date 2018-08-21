import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

import DisplayContainer from '@scenes/DisplayContainer'
import Menu from '@scenes/Menu'

import { Container } from 'semantic-ui-react'

import configureStore from './configureStore'

import './theme/base.scss'
import 'semantic-ui-less/semantic.less'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  render () {
    return (
      <Fragment>
        <ToastContainer position="top-right" closeOnClick draggable pauseOnHover pauseOnVisibilityChange />

        <Menu/>

        <Container style={{ marginLeft: 250 + 'px' }} >
          <DisplayContainer />
        </Container>
      </Fragment>
    )
  }
}

const {store, persistor} = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,

  document.getElementById('app')
)
