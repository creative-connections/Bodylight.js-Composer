import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Dropdown } from 'semantic-ui-react'
import { configGetChart } from '@reducers'
import { updateConfig, renameChart, removeChart } from '@actions/actions'

import GridRow from '@components/GridRow'
import PlotlyChart from './PlotlyChart'
import Chartjs from './Chartjs'
import Gamblegram from './Gamblegram'

class ConfigChart extends Component {
  constructor(props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renameChart = this.renameChart.bind(this)

    const libraries = [
      { key: 'plotly', text: 'Line chart - Plot.ly', value: 'plotly' },
      { key: 'gamblegram', text: 'Gamblegram - Plot.ly', value: 'gamblegram' },
    ]

    this.state = { libraries }
  }

  renameChart(e, { value }) {
    this.props.renameChart(this.props.chart, value)
  }

  handleRemove(e, { value }) {
    this.props.removeChart(this.props.chart, value)
  }

  handleOnChange(e, { name, value, checked }) {
    if (typeof checked !== 'undefined') {
      value = checked
    }

    this.props.updateConfig(this.props.chart, name, value)
  }

  render() {
    const config = this.props.config
    return <Fragment>
      <GridRow label='Name'>
        <Input
          name='name'
          value={this.props.chart.name}
          onChange={this.renameChart}
        />
      </GridRow>
      <GridRow inline label='Chart type'>
        <Dropdown
          name='library'
          placeholder='Select chart type'
          value={config.library}
          onChange={this.handleOnChange}
          options={this.state.libraries}
        />
      </GridRow>

      {config.library === 'plotly' &&
        <PlotlyChart config={config} chart={this.props.chart} onChange={this.handleOnChange}/> }
      {config.library === 'chartjs' &&
        <Chartjs config={config} chart={this.props.chart} onChange={this.handleOnChange}/> }
      {config.library === 'gamblegram' &&
        <Gamblegram config={config} chart={this.props.chart} onChange={this.handleOnChange}/> }
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
