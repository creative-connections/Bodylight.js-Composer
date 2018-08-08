import React, { Component } from 'react'
import { connect } from 'react-redux'

import ActiveScreen from '@helpers/ActiveScreenEnum'
import Configuration from '@scenes/Configuration'
import Preview from '@scenes/Preview'
import Connect from '@scenes/Connect'

class DisplayContainer extends Component {
  render () {
    const screen = this.props.activeScreen

    if (screen === ActiveScreen.CONFIG) {
      return [
        <Configuration key="configuration"/>
      ]
    }

    if (screen === ActiveScreen.CONNECT) {
      return [
        <Connect key="connect"/>
      ]
    }

    if (screen === ActiveScreen.DESIGN) {
      return null
    }

    if (screen === ActiveScreen.PREVIEW) {
      return [
        <Preview key="preview"/>
      ]
    }

    return null
  }
}

function mapStateToProps ({ activeScreen }) {
  return { activeScreen }
}

export default connect(mapStateToProps)(DisplayContainer)
