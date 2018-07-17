import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Segment, Button, Header } from 'semantic-ui-react'
import { Dropdown, Menu } from 'semantic-ui-react'

import ModelList from './components/ModelList'
import AnimateList from './components/AnimateList'

class Configuration extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Grid padded centered>
        <Grid.Row centered padded='horizontally'>
          <Grid.Column width={16} style={{ maxWidth: 100 + 'em' }} >
            <ModelList/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered padded='horizontally'>
          <Grid.Column width={16} style={{ maxWidth: 100 + 'em' }} >
            <AnimateList/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Configuration
