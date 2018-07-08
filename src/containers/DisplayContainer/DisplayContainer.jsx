import React, { Component } from 'react'

import ActiveScreen from '@helpers/ActiveScreenEnum'
import ModelList from '@containers/ModelList'

class DisplayContainer extends Component {
  render () {
    const screen = this.props.screen

    if (screen === ActiveScreen.MODEL) {
      return <ModelList/>
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
