import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

import reducers from './reducers'
import ModelList from './containers/ModelList'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './scss/base.scss'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

class App extends Component {
  render () {
    return (
      <div className="layout">
        <ToastContainer
          position="top-right"
          closeOnClick
          draggable
          pauseOnHover
          pauseOnVisibilityChange
        />
        <header>
          <p>Bodylight.js Composer</p>
        </header>
        <div className="middle">
          <div className='left'>
            <p>models</p>
            <ModelList />
          </div>
          <div className='grapes'>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('app')
)
