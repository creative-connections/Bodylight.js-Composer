import React, { Component, Fragment } from 'react'

import GridRow from '@components/GridRow'
import ComplexAttribute from '@components/ComplexAttribute'
import Collapsable from '@components/Collapsable'
import Events from '../../Events'

import Datasets from './Datasets'

class Chartjs extends Component {
  render() {
    const config = this.props.config
    return <Fragment>
      <GridRow border label='Enabled'>
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

      <Events
        widget={this.props.chart}
        config={config}
      />
    </Fragment>
  }
}

export default Chartjs