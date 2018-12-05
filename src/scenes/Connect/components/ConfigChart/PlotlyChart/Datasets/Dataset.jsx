import React, { Component, Fragment } from 'react'
import { Input, Checkbox, Dropdown } from 'semantic-ui-react'

import ComplexAttribute from '../../../ComplexAttribute'
import GridRow from '../../../GridRow'
import ButtonLink from '@components/ButtonLink'
import FunctionEditor from '@components/FunctionEditor'

import Line from './Line'

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

      <GridRow border label='y axis'>
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

      <GridRow border label='x axis'>
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
      <GridRow border label='Maximum samples'>
        <ComplexAttribute
          name={`${name}.maxSamples`}
          attribute={config.maxSamples}
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

export default Dataset