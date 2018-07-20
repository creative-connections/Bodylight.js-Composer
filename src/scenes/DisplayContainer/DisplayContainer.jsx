import React, { Component } from 'react'
import { connect } from 'react-redux'

import ActiveScreen from '@helpers/ActiveScreenEnum'
import Configuration from '@scenes/Configuration'
import Builder from '@runtime'
import Preview from '@scenes/Preview'

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
      return <div>connect</div>
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
