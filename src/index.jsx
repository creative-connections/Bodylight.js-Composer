import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'

import reducers from './reducers'
import DisplayContainer from '@scenes/DisplayContainer'
import ActiveScreen from '@helpers/ActiveScreenEnum'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './theme/base.scss'
import 'semantic-ui-less/semantic.less'

import { Container, Divider, Grid, Menu, Input } from 'semantic-ui-react'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeScreen: ActiveScreen.CONFIG
    }

    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick (e, {name}) {
    this.setState({
      activeScreen: name
    })
  }

  render () {
    return (
      <div>
        <ToastContainer position="top-right" closeOnClick draggable pauseOnHover pauseOnVisibilityChange />

        <Menu vertical fixed='left' style={{width: 250 + 'px'}}>
          <Container>
            <Menu.Item header>
              Bodylight.js Composer
            </Menu.Item>

            <Menu.Item name={ActiveScreen.CONFIG} active={this.state.activeScreen === ActiveScreen.CONFIG} onClick={this.handleMenuClick}>
              Configuration
            </Menu.Item>

            <Menu.Item name={ActiveScreen.CONNECT} active={this.state.activeScreen === ActiveScreen.CONNECT} onClick={this.handleMenuClick}>
              Connect
            </Menu.Item>

            <Menu.Item name={ActiveScreen.DESIGN} active={this.state.activeScreen === ActiveScreen.DESIGN} onClick={this.handleMenuClick}>
              Design
            </Menu.Item>

            <Menu.Item position='right'>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>

            <Divider horizontal>FMU</Divider>
            <Divider horizontal>Animate</Divider>
          </Container>
        </Menu>

        <Container style={{ marginLeft: 250 + 'px' }} >
          <DisplayContainer screen={this.state.activeScreen} />
        </Container>
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
