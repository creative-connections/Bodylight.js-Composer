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
  addButton,
  addAction
} from '@actions'

class WidgetMenu extends Component {
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
        <Button onClick={this.props.addRange}>Add range</Button>
        <Divider hidden/>
        <Button onClick={this.props.addButton}>Add button</Button>
        <Divider hidden/>
        <Button onClick={this.props.addAction}>Add action</Button>
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
    addButton,
    addAction
  }, dispatch)
)(WidgetMenu)
