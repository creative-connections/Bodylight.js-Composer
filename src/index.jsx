import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import history from '@helpers/BrowserHistory'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

import DisplayContainer from '@scenes/DisplayContainer'
import Menu from '@scenes/Menu'

import { Container } from 'semantic-ui-react'

import configureStore from './configureStore'

import 'react-toastify/dist/ReactToastify.css'
import 'semantic-ui-css/semantic.min.css'
import './theme/base.scss'

import generateID from '@helpers/generateID'

class App extends Component {
  render() {
    return (
      <Fragment>
        <ToastContainer position="bottom-right" closeOnClick draggable pauseOnHover pauseOnVisibilityChange />
        <Menu/>
        <div style={{ marginLeft: 250 + 'px' }} >
          <DisplayContainer location={this.props.location}/>
        </div>
      </Fragment>
    )
  }
}

function render({ store, persistor }) {
  ReactDOM.render(
    <Provider store={store} key={generateID()}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
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