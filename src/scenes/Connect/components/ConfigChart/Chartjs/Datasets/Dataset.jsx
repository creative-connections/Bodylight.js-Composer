import React, { Component, Fragment } from 'react'
import { Input, Checkbox, Dropdown, Grid, Divider } from 'semantic-ui-react'

import ComplexAttribute from '../../../ComplexAttribute'
import GridRow from '../../../GridRow'
import ButtonLink from '@components/ButtonLink'
import FunctionEditor from '@components/FunctionEditor'

import Line from './Line'

class Dataset extends Component {
  constructor (props) {
    super(props)

    const mode = [
      {key: 'lines', text: 'Lines', value: 'lines'},
      {key: 'markers', text: 'Markers', value: 'markers'},
      {key: 'lines+markers', text: 'Lines + Markers', value: 'lines+markers'},
      {key: 'none', text: 'None', value: 'none'}
    ]

    this.state = {
      options: {
        mode
      }
    }
  }

  render () {
    const config = this.props.config
    const name = this.props.name
    console.log(config)
    return <Fragment>

      <GridRow label='Name:'>
        <Input
          name={`${name}.name`}
          value={config.name}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow label='y axis:'>
        { config.y.time === false &&
            <ComplexAttribute complex array
              name={`${name}.y`}
              attribute={config.y}
              onChange={this.props.onChange}
            />
        }
        <Checkbox
          style={{padding: '0.8em 0em 0.8em 0.0em'}}
          label='y is controlled by time'
          name={`${name}.y.time`}
          checked={config.y.time}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow label='x axis:'>
        { config.x.time === false &&
            <ComplexAttribute complex array
              name={`${name}.x`}
              attribute={config.x}
              onChange={this.props.onChange}
            />
        }
        <Checkbox
          style={{padding: '0.8em 0em 0.8em 0.0em'}}
          label='x is controlled by time'
          name={`${name}.x.time`}
          checked={config.x.time}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow label='Maximum samples:'>
        <ComplexAttribute
          name={`${name}.maxSamples`}
          attribute={config.maxSamples}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow label='' compact={true}>
        <ButtonLink name={config.id} onClick={this.props.onRemove}>remove dataset</ButtonLink>
      </GridRow>

      <GridRow label='Mode:'>
        <Dropdown
          name={`${name}.mode`}
          value={config.mode}
          onChange={this.props.onChange}
          options={this.state.options.mode}
        />
      </GridRow>
      <Line
        name={`${name}.line`}
        config={config.line}
        onChange={this.props.onChange}
      />
      <GridRow label='Custom:'>
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
