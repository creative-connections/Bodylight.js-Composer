import React, { Component } from 'react'

import ActiveScreen from '@helpers/ActiveScreenEnum'
import ModelList from '@components/ModelList'
import AnimateList from '@components/AnimateList'

import { Grid, Segment, Button, Header } from 'semantic-ui-react'

class DisplayContainer extends Component {
  render () {
    const screen = this.props.screen

    if (screen === ActiveScreen.MODEL) {
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
    if (screen === ActiveScreen.CONNECT) {
      return <div>connect</div>
    }
    if (screen === ActiveScreen.DESIGN) {
      return <div>design</div>
    }
  }
}

export default DisplayContainer
