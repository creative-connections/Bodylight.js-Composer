import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'

import { Dropdown, Divider, Button, Header, Grid, Transition, Segment } from 'semantic-ui-react'

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

  render () {
    return (
      <Fragment>
        <NavLink to='/add/model'>
          <Button>Add model</Button>
        </NavLink>
        <Divider hidden/>
        <NavLink to='/add/animate'>
          <Button>Add animate</Button>
        </NavLink>
        <Divider hidden/>
        <Button onClick={this.addRange}>Add range</Button>
        <Divider hidden/>
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
