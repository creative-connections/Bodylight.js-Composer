import React, { Component, Fragment } from 'react'
import { Dropdown, Input } from 'semantic-ui-react'

import ComplexAttribute from '@components/ComplexAttribute'
import GridRow from '@components/GridRow'
import ButtonLink from '@components/ButtonLink'

import Source from './Source'

class Image extends Component {
  constructor(props) {
    super(props)

    const xref = [
      { key: 'x', text: 'Referenced to x axis', value: 'x' },
      { key: 'paper', text: 'Referenced to drawing area (0-1)', value: 'paper' }
    ]
    const yref = [
      { key: 'y', text: 'Referenced to y axis', value: 'y' },
      { key: 'paper', text: 'Referenced to drawing area (0-1)', value: 'paper' }
    ]
    const layer = [
      { key: 'below', text: 'Below', value: 'below' },
      { key: 'above', text: 'Above', value: 'above' },
    ]
    const xanchor = [
      { key: 'left', text: 'Left', value: 'left' },
      { key: 'center', text: 'Center', value: 'center' },
      { key: 'right', text: 'Right', value: 'right' },
    ]
    const yanchor = [
      { key: 'top', text: 'Top', value: 'top' },
      { key: 'middle', text: 'Middle', value: 'middle' },
      { key: 'bottom', text: 'Bottom', value: 'bottom' },
    ]
    const sizing = [
      { key: 'fill', text: 'Fill', value: 'fill' },
      { key: 'contain', text: 'Contain', value: 'contain' },
      { key: 'stretch', text: 'Stretch', value: 'stretch' },
    ]

    this.state = {
      options: { xref, yref, layer, xanchor, yanchor, sizing }
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

      <GridRow border label='source'>
        <Source
          name={`${name}.source`}
          value={config.source}
          onChange={this.props.onChange}
          />
      </GridRow>

      <GridRow border label='x'>
        <ComplexAttribute
          name={`${name}.x`}
          attribute={config.x}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow border label='y'>
        <ComplexAttribute
          name={`${name}.y`}
          attribute={config.y}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow label='x reference'>
        <Dropdown
          name={`${name}.xref`}
          value={config.xref}
          onChange={this.props.onChange}
          options={this.state.options.xref}
        />
      </GridRow>
      <GridRow label='y reference'>
        <Dropdown
          name={`${name}.yref`}
          value={config.yref}
          onChange={this.props.onChange}
          options={this.state.options.yref}
        />
      </GridRow>

      <GridRow border label='Size x'>
        <ComplexAttribute
          name={`${name}.sizex`}
          attribute={config.sizex}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow border label='Size y'>
        <ComplexAttribute
          name={`${name}.sizey`}
          attribute={config.sizey}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow border label='Visible'>
        <ComplexAttribute
          name={`${name}.visible`}
          label='Shape is visible'
          attribute={config.visible}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow border label='Opacity'>
        <ComplexAttribute
          name={`${name}.opacity`}
          attribute={config.opacity}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow label='Layer'>
        <Dropdown
          name={`${name}.layer`}
          value={config.layer}
          onChange={this.props.onChange}
          options={this.state.options.layer}
        />
      </GridRow>

      <GridRow label='Sizing'>
        <Dropdown
          name={`${name}.sizing`}
          value={config.sizing}
          onChange={this.props.onChange}
          options={this.state.options.sizing}
        />
      </GridRow>

      <GridRow label='X anchor'>
        <Dropdown
          name={`${name}.xanchor`}
          value={config.xanchor}
          onChange={this.props.onChange}
          options={this.state.options.xanchor}
        />
      </GridRow>
      <GridRow label='Y anchor'>
        <Dropdown
          name={`${name}.yanchor`}
          value={config.yanchor}
          onChange={this.props.onChange}
          options={this.state.options.yanchor}
        />
      </GridRow>


      <GridRow label='' compact={true}>
        <ButtonLink name={config.id} onClick={this.props.onRemove}>remove image</ButtonLink>
      </GridRow>

    </Fragment>
  }
}

export default Image