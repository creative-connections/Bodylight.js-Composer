import React, { Component, Fragment } from 'react'
import { Dropdown, Grid, Input, Header, Divider } from 'semantic-ui-react'

import ComplexAttribute from '../../../ComplexAttribute'
import GridRow from '../../../GridRow'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'

class Line extends Component {
  constructor (props) {
    super(props)

    const layer = [
      {key: 'above', text: 'Draw above traces', value: 'above'},
      {key: 'below', text: 'Draw below traced', value: 'below'}
    ]
    const xref = [
      {key: 'x', text: 'Referenced to x axis', value: 'x'},
      {key: 'paper', text: 'Referenced to drawing area (0-1)', value: 'paper'}
    ]
    const yref = [
      {key: 'y', text: 'Referenced to y axis', value: 'y'},
      {key: 'paper', text: 'Referenced to drawing area (0-1)', value: 'paper'}
    ]

    this.state = {
      options: {
        layer,
        xref,
        yref
      }
    }
  }

  render () {
    const config = this.props.config
    const name = this.props.name

    return <Fragment>

      <Divider/>
      <h3>Line</h3>
      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='Name:'>
          <Input
            name={`${name}.name`}
            value={config.name}
            onChange={this.props.onChange}
          />
        </GridRow>

        <h3>Coordinates</h3>
        <GridRow label='x0:'>
          <ComplexAttribute
            name={`${name}.x0`}
            attribute={config.x0}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='y0:'>
          <ComplexAttribute
            name={`${name}.y0`}
            attribute={config.y0}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='x1:'>
          <ComplexAttribute
            name={`${name}.x1`}
            attribute={config.x1}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='y1:'>
          <ComplexAttribute
            name={`${name}.y1`}
            attribute={config.y1}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='x reference:'>
          <Dropdown
            name={`${name}.xref`}
            value={config.xref}
            onChange={this.props.onChange}
            options={this.state.options.xref}
          />
        </GridRow>

        <GridRow label='y reference:'>
          <Dropdown
            name={`${name}.yref`}
            value={config.yref}
            onChange={this.props.onChange}
            options={this.state.options.yref}
          />
        </GridRow>

        <h3>Display options</h3>

        <GridRow label='Visible'>
          <ComplexAttribute
            name={`${name}.visible`}
            label='Line is visible'
            attribute={config.visible}
            onChange={this.props.onChange}
          />
        </GridRow>
        <GridRow label='Opacity'>
          <ComplexAttribute
            name={`${name}.opacity`}
            attribute={config.opacity}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='Layer:'>
          <Dropdown
            name={`${name}.layer`}
            value={config.layer}
            onChange={this.props.onChange}
            options={this.state.options.layer}
          />
        </GridRow>

        <GridRow label='Color'>
          <ComplexAttribute
            name={`${name}.color`}
            attribute={config.color}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='Width'>
          <ComplexAttribute
            name={`${name}.width`}
            attribute={config.width}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='Dash'>
          <ComplexAttribute
            name={`${name}.dash`}
            attribute={config.dash}
            onChange={this.props.onChange}
          />
        </GridRow>

        <GridRow label='' compact={true}>
          <ButtonLink name={config.id} onClick={this.props.onRemove}>remove line</ButtonLink>
        </GridRow>

      </Grid>
    </Fragment>
  }
}

export default Line
