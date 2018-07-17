import React, { Component } from 'react'

import ActiveScreen from '@helpers/ActiveScreenEnum'
import Configuration from '@scenes/Configuration'

class DisplayContainer extends Component {
  render () {
    const screen = this.props.screen

    if (screen === ActiveScreen.CONFIG) {
      return <Configuration/>
    }
    if (screen === ActiveScreen.CONNECT) {
      return <div>connect</div>
    }
    if (screen === ActiveScreen.DESIGN) {
      return <div>design</div>
    }
  }
}

export default DisplayContainer
