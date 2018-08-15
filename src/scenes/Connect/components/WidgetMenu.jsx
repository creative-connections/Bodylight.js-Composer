import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Dropdown, Button, Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

import {
  getAvailableRangeName,
  getAvailableButtonName
} from '@reducers'

import {
  addRange,
  addButton
} from '@actions'

class WidgetMenu extends Component {
  constructor (props) {
    super(props)
    this.addRange = this.addRange.bind(this)
    this.addButton = this.addButton.bind(this)
  }

  addRange () {
    const name = this.props.getAvailableRangeName()
    this.props.addRange(name)
  }

  addButton () {
    const name = this.props.getAvailableButtonName()
    this.props.addButton(name)
  }

  render () {
    return (
      <div>
        <Segment>
          <Button onClick={this.addRange}>Add range</Button>
        </Segment>
        <Segment>
          <Button onClick={this.addButton}>Add button</Button>
        </Segment>
      </div>
    )
  }
}

export default connect(
  state => ({
    'getAvailableButtonName': () => getAvailableButtonName(state),
    'getAvailableRangeName': () => getAvailableRangeName(state)
  }),
  dispatch => bindActionCreators({
    addRange,
    addButton
  }, dispatch)
)(WidgetMenu)
