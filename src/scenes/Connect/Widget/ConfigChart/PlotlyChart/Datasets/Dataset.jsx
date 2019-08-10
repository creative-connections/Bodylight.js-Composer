import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Checkbox, Dropdown } from 'semantic-ui-react'

import ComplexAttribute from '@components/ComplexAttribute'
import GridRow from '@components/GridRow'
import ButtonLink from '@components/ButtonLink'
import FunctionEditor from '@components/FunctionEditor'

import Line from './Line'

import { plotlyAddAxis } from '@actions'
import { getAllChartAxesForDropdown } from '@reducers'

class Dataset extends Component {
  constructor(props) {
    super(props)

    const mode = [
      { key: 'lines', text: 'Lines', value: 'lines' },
      { key: 'markers', text: 'Markers', value: 'markers' },
      { key: 'lines+markers', text: 'Lines + Markers', value: 'lines+markers' },
      { key: 'none', text: 'None', value: 'none' }
    ]

    const fill = [
      { key: 'none', text: 'none', value: 'none' },
      { key: 'tozeroy', text: 'tozeroy', value: 'tozeroy' },
      { key: 'tozerox', text: 'tozerox', value: 'tozerox' },
      { key: 'tonexty', text: 'tonexty', value: 'tonexty' },
      { key: 'tonextx', text: 'tonextx', value: 'tonextx' },
      { key: 'toself', text: 'toself', value: 'toself' },
      { key: 'tonext', text: 'tonext', value: 'tonext' },
    ]

    this.state = {
      options: { mode, fill }
    }

    this.addXAxis = this.addXAxis.bind(this)
    this.addYAxis = this.addYAxis.bind(this)
  }

  addXAxis() {
    this.props.plotlyAddAxis(this.props.chart.id, this.props.name, 'x', 'xaxis')
  }

  addYAxis() {
    this.props.plotlyAddAxis(this.props.chart.id, this.props.name, 'y', 'yaxis')
  }

  render() {
    const config = this.props.config
    const name = this.props.name
    return <Fragment>

      <GridRow label='Name'>
        <Input
          name={`${name}.name`}
          value={config.name}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow label='' compact={true}>
        <ButtonLink name={config.id} onClick={this.props.onRemove}>remove dataset</ButtonLink>
      </GridRow>

      <GridRow border label='Y axis'>
        { config.y.time === false &&
          <ComplexAttribute complex array
            name={`${name}.y`}
            attribute={config.y}
            onChange={this.props.onChange}
          />
        }
        <Checkbox
          label='y is controlled by time'
          name={`${name}.y.time`}
          checked={config.y.time}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow>
        <ButtonLink onClick={this.addYAxis}>Add another Y axis</ButtonLink>
      </GridRow>

      <GridRow border label='X axis'>
        { config.x.time === false &&
          <ComplexAttribute complex array
            name={`${name}.x`}
            attribute={config.x}
            onChange={this.props.onChange}
          />
        }
        <Checkbox
          label='x is controlled by time'
          name={`${name}.x.time`}
          checked={config.x.time}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow>
        <ButtonLink onClick={this.addXAxis}>Add another X axis</ButtonLink>
      </GridRow>

      <GridRow border label='Maximum samples'>
        <ComplexAttribute
          name={`${name}.maxSamples`}
          attribute={config.maxSamples}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow border label='Offset (array variable only)'>
        <ComplexAttribute
          name={`${name}.offset`}
          attribute={config.offset}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow inline label='Mode'>
        <Dropdown
          name={`${name}.mode`}
          value={config.mode}
          onChange={this.props.onChange}
          options={this.state.options.mode}
        />
      </GridRow>

      <GridRow inline label='Fill'>
        <Dropdown
          name={`${name}.fill`}
          value={config.fill}
          onChange={this.props.onChange}
          options={this.state.options.fill}
        />
      </GridRow>

      <Line
        name={`${name}.line`}
        config={config.line}
        onChange={this.props.onChange}
      />

      <GridRow inline label='Legend'>
        <Checkbox
          label='show'
          name={`${name}.showlegend`}
          checked={config.showlegend}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow label='Custom'>
        <FunctionEditor
          name={`${name}.other`}
          value={config.other}
          onChange={this.props.onChange}
          typeof='object'
          disableRemove={true}
        />
      </GridRow>
    </Fragment>
  }
}
export default connect(
  (state, props) => ({
    axes: getAllChartAxesForDropdown(state, props.chart.id)
  }),
  dispatch => bindActionCreators({ plotlyAddAxis }, dispatch)
)(Dataset)
