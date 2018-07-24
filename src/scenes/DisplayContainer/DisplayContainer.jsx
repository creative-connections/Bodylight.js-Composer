import React, { Component } from 'react'
import { connect } from 'react-redux'

import ActiveScreen from '@helpers/ActiveScreenEnum'
import Configuration from '@scenes/Configuration'
import Builder from '@runtime'
import Preview from '@scenes/Preview'
import Connect from '@scenes/Connect'

class DisplayContainer extends Component {
  render () {
    const screen = this.props.activeScreen

    if (screen === ActiveScreen.CONFIG) {
      return [
        <Configuration key="configuration"/>,
        <Preview key="preview"/>
      ]
    }
    if (screen === ActiveScreen.CONNECT) {
      return [
        <Connect key="connect"/>
      ]
    }
    if (screen === ActiveScreen.DESIGN) {
      return <div>design</div>
    }
  }
}

function mapStateToProps ({ activeScreen }) {
  return { activeScreen }
}

export default connect(mapStateToProps)(DisplayContainer)
