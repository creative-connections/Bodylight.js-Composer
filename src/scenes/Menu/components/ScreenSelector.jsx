import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActiveScreen from '@helpers/ActiveScreenEnum'

import { Menu } from 'semantic-ui-react'

import { selectScreen } from '@actions/actions'

class ScreenSelector extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e, {name}) {
    this.props.selectScreen(name)
  }

  render () {
    return (
      <div>
        <Menu.Item name={ActiveScreen.CONFIG} active={this.props.activeScreen === ActiveScreen.CONFIG} onClick={this.handleClick}>
              Configuration
        </Menu.Item>

        <Menu.Item name={ActiveScreen.CONNECT} active={this.props.activeScreen === ActiveScreen.CONNECT} onClick={this.handleClick}>
              Connect
        </Menu.Item>

        <Menu.Item name={ActiveScreen.DESIGN} active={this.props.activeScreen === ActiveScreen.DESIGN} onClick={this.handleClick}>
              Design
        </Menu.Item>
      </div>
    )
  }
}

function mapStateToProps ({ activeScreen }) {
  return { activeScreen }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ selectScreen }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenSelector)
