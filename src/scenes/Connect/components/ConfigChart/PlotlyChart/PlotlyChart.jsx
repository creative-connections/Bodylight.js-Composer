import React, { Component, Fragment } from 'react'

import update from 'immutability-helper'
import { Input, Header, Grid, Divider, Transition } from 'semantic-ui-react'
import ButtonLink from '@components/ButtonLink'

import GridRow from '../../GridRow'
import ComplexAttribute from '../../ComplexAttribute'
import Events from '../../Events'

import Datasets from './Datasets'

import Axis from './Axis'

class PlotlyChart extends Component {
  render () {
    const config = this.props.config
    return <Fragment>
      <br></br>
      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='Enabled:'>
          <ComplexAttribute
            name='enabled'
            label='Chart responds to input change'
            attribute={config.enabled}
            onChange={this.props.onChange}
          />
        </GridRow>
      </Grid>

      <Divider hidden/>
      <Header as="h2">Datasets</Header>
      <Datasets name='datasets'
        config={config.datasets}
        onChange={this.props.onChange}
      />

      <Divider hidden/>
      <Header as="h2">X axis</Header>
      <Axis name='xaxis'
        config={config.xaxis}
        onChange={this.props.onChange}/>

      <Header as="h2">Y axis</Header>
      <Axis name='yaxis'
        config={config.yaxis}
        onChange={this.props.onChange}/>

      <Events
        widget={this.props.chart}
        config={config}
      />

    </Fragment>
  }
}

export default PlotlyChart
