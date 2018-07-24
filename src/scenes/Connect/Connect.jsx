import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Segment, Button, Header, Sticky } from 'semantic-ui-react'

import WidgetDropdown from './components/WidgetDropdown'
import WidgetMenu from './components/WidgetMenu'

class Connect extends Component {
  constructor (props) {
    super(props)
    console.log('constructed')
  }

  render () {
    return (
      <Grid padded centered>
        <Grid.Row centered padded='horizontally'>
          <Grid.Column width={12}>
            <WidgetDropdown />
          </Grid.Column>
          <Grid.Column width={4}>
            <Sticky>
              <WidgetMenu />
            </Sticky>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Connect
