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
    return <div id='connect-menu'>
      <Grid centered>
        <Grid.Row centered className='group-title'>
          <Grid.Column width={16}>
            Providers
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={8}>
            <NavLink to='/add/model' className='block'> Model </NavLink>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered className='group-title'>
          <Grid.Column width={16}>
            Visualisation
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <NavLink to='/add/animate' className='block'> Animate </NavLink>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered className='group-title'>
          <Grid.Column width={16}>
            Controls
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <div className='block' onClick={this.props.addRange}>
              Range
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className='block' onClick={this.props.addButton}>
              Button
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <div className='block' onClick={this.props.addRange}>
              Range
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className='block' onClick={this.props.addButton}>
              Button
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered className='group-title'>
          <Grid.Column width={16}>
            Meta
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <div className='block' onClick={this.props.addAction}>
              Action
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    </div>
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
