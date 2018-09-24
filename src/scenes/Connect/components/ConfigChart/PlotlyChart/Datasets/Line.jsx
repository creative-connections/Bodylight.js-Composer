import React, { Component, Fragment } from 'react'
import { Dropdown, Grid, Input, Header, Divider, Checkbox } from 'semantic-ui-react'

import ComplexAttribute from '../../../ComplexAttribute'
import GridRow from '../../../GridRow'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'
import InputFloat from '@components/InputFloat'

import ColorPicker from '@components/ColorPicker'

class Line extends Component {
  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)

    const shape = [
      {key: 'linear', text: 'Linear', value: 'linear'},
      {key: 'spline', text: 'Spline', value: 'spline'},
      {key: 'hv', text: 'hv', value: 'hv'},
      {key: 'vh', text: 'vh', value: 'vh'},
      {key: 'hvh', text: 'hvh', value: 'hvh'},
      {key: 'vhv', text: 'vhv', value: 'vhv'}
    ]

    const dash = [
      {key: 'solid', text: 'Solid', value: 'solid'},
      {key: 'dot', text: 'Dot', value: 'dot'},
      {key: 'dash', text: 'Dash', value: 'dash'},
      {key: 'longdash', text: 'Long dash', value: 'longdash'},
      {key: 'dashdot', text: 'Dash dot', value: 'dashdot'},
      {key: 'longdashdot', text: 'Long dash dot', value: 'longdashdot'}
    ]

    this.state = {
      options: {
        shape,
        dash
      }
    }
  }

  handleOnChange (e, {name, value}) {
    const config = update(this.props.config, {
      [name]: {$set: value}
    })

    this.props.onChange(null, {
      name: this.props.name,
      value: config
    })
  }

  render () {
    const config = this.props.config
    return <Fragment>
      <GridRow label='color:'>
        <ColorPicker
          name='color'
          value={config.color}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='width:'>
        <InputFloat
          name='width'
          value={config.width}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='shape:'>
        <Dropdown
          name='shape'
          value={config.shape}
          onChange={this.handleOnChange}
          options={this.state.options.shape}
        />
      </GridRow>
      <GridRow label='smoothing:'>
        <InputFloat
          name='smoothing'
          value={config.smoothing}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='dash:'>
        <Dropdown
          name='dash'
          value={config.dash}
          onChange={this.handleOnChange}
          options={this.state.options.dash}
        />
      </GridRow>
      <GridRow label='simplify'>
        <Checkbox
          style={{padding: '0.8em 0em 0.8em 0.0em'}}
          label='remove similar datapoints'
          name='simplify'
          checked={config.simplify}
          onChange={this.handleOnChange}
        />
      </GridRow>
    </Fragment>
  }
}

export default Line
