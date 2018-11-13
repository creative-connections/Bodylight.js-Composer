import React, { Component, Fragment } from 'react'

import update from 'immutability-helper'
import { Input, Header, Grid, Divider, Transition } from 'semantic-ui-react'
import ButtonLink from '@components/ButtonLink'

import GridRow from '../../GridRow'
import ComplexAttribute from '../../ComplexAttribute'
import Collapsable from '../../Collapsable'
import Events from '../../Events'

import Datasets from './Datasets'

class Chartjs extends Component {
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

      <Events
        widget={this.props.chart}
        config={config}
      />

    </Fragment>
  }
}

export default Chartjs
