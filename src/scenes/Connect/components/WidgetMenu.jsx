import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Dropdown, Button, Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

import {
  getAvailableRangeName
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
    this.props.addRange()
  }

  addButton () {
    this.props.addButton()
  }

  addModel () {
    console.warn('not implemented yet')
  }

  render () {
    return (
      <Fragment>
        <Button onClick={this.addModel}>Add model</Button>
        <br/>
        <br/>
        <Button onClick={this.addRange}>Add range</Button>
        <br/>
        <br/>
        <Button onClick={this.addButton}>Add button</Button>
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    'getAvailableRangeName': () => getAvailableRangeName(state)
  }),
  dispatch => bindActionCreators({
    addRange,
    addButton
  }, dispatch)
)(WidgetMenu)
