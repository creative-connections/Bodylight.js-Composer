import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import update from 'immutability-helper'

import { Input, Header, Grid, Divider, Transition } from 'semantic-ui-react'

import { configGetChart } from '@reducers'
import { updateConfig, renameChart, removeChart } from '@actions/actions'

import ButtonLink from '@components/ButtonLink'

import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'
import Events from '../Events'

import PlotlyChart from './PlotlyChart'

class ConfigChart extends Component {
  constructor (props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleAutoRename = this.handleAutoRename.bind(this)

    this.renameChart = this.renameChart.bind(this)
  }

  handleAutoRename () {
    let config = this.props.config
    const provider = ValueProviders.value(config.target.provider)
    const generatedName = `${provider.parent}.${provider.name}`
    this.renameChart(null, {value: generatedName})
  }

  renameChart (e, {value}) {
    this.props.renameChart(this.props.chart, value)
  }

  handleRemove (e, {value}) {
    this.props.removeChart(this.props.chart, value)
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined') {
      value = checked
    }

    this.props.updateConfig(this.props.chart, name, value)
  }

  render () {
    const config = this.props.config
    return <Fragment>

      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='Name:'>
          <Input
            name='name'
            value={this.props.chart.name}
            onChange={this.renameChart}
          />
        </GridRow>
        <GridRow label='library:'>
          {config.library}
        </GridRow>

        <GridRow label='Maximum samples:'>
          <ComplexAttribute
            name='maxSamples'
            attribute={config.maxSamples}
            onChange={this.handleOnChange}
          />
        </GridRow>
      </Grid>

      <PlotlyChart
        config={config}
        chart={this.props.chart}
        onChange={this.handleOnChange}/>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetChart(state, props.chart.id)
  }),
  dispatch => bindActionCreators({
    updateConfig,
    renameChart,
    removeChart
  }, dispatch)
)(ConfigChart)
