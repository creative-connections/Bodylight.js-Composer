import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
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

import generateID from '@helpers/generateID'

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

function render ({store, persistor}) {
  ReactDOM.render(
    <Provider store={store} key={generateID()}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route path={`${process.env.PATH}/`} component={App} />
        </Router>
      </PersistGate>
    </Provider>,
    document.getElementById('app')
  )
}

render(
  configureStore(
    () => {
      console.log('callback, store changed')
      render(configureStore())
    }
  )
)
