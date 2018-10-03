import React, { Component, Fragment } from 'react'

import update from 'immutability-helper'
import { Input, Header, Grid, Divider, Transition } from 'semantic-ui-react'
import ButtonLink from '@components/ButtonLink'

import GridRow from '../../GridRow'
import ComplexAttribute from '../../ComplexAttribute'
import Collapsable from '../../Collapsable'
import Events from '../../Events'

import Datasets from './Datasets'
import Shapes from './Shapes'
import Axis from './Axis'

class PlotlyChart extends Component {
  render () {
    const config = this.props.config
    return <Fragment>
      <GridRow label='Enabled:'>
        <ComplexAttribute
          name='enabled'
          label='Chart responds to input change'
          attribute={config.enabled}
          onChange={this.props.onChange}
        />
      </GridRow>

      <Collapsable title='Datasets' className='primary' collapsed={true}>
        <Datasets name='datasets'
          config={config.datasets}
          onChange={this.props.onChange}
        />
      </Collapsable>

      <Collapsable title='Axes' className='primary' collapsed={true}>
        <Collapsable title='X Axis' className='secondary' collapsed={false}>
          <Axis name='xaxis'
            config={config.xaxis}
            onChange={this.props.onChange}/>

        </Collapsable>
        <Collapsable title='Y Axis' className='secondary' collapsed={false}>
          <Axis name='yaxis'
            config={config.yaxis}
            onChange={this.props.onChange}/>
        </Collapsable>
      </Collapsable>

      <Collapsable title='Shapes' className='primary' collapsed={true}>
        <Shapes name='shapes'
          config={config.shapes}
          onChange={this.props.onChange}/>
      </Collapsable>

      <Events
        widget={this.props.chart}
        config={config}
      />

    </Fragment>
  }
}

export default PlotlyChart
