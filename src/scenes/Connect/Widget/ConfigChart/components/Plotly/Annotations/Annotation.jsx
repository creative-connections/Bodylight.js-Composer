import React, { Component, Fragment } from 'react'
import { Dropdown, Input } from 'semantic-ui-react'

import ComplexAttribute from '@components/ComplexAttribute'
import GridRow from '@components/GridRow'
import ButtonLink from '@components/ButtonLink'

class Annotation extends Component {
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

    this.state = {
      options: { xref, yref }
    }
  }

  render() {
    const config = this.props.config
    const name = this.props.name

    return <Fragment>
      <GridRow border label='text'>
        <ComplexAttribute
          name={`${name}.text`}
          attribute={config.text}
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

      <GridRow border label='Font family'>
        <ComplexAttribute
          name={`${name}.family`}
          attribute={config.family}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow border label='Color'>
        <ComplexAttribute
          name={`${name}.color`}
          attribute={config.color}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow border label='Background color'>
        <ComplexAttribute
          name={`${name}.bgcolor`}
          attribute={config.bgcolor}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow border label='Border color'>
        <ComplexAttribute
          name={`${name}.bordercolor`}
          attribute={config.bordercolor}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow border label='Size'>
        <ComplexAttribute
          name={`${name}.size`}
          attribute={config.size}
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

      <GridRow border label='Width'>
        <ComplexAttribute
          name={`${name}.width`}
          attribute={config.width}
          onChange={this.props.onChange}
        />
      </GridRow>
      <GridRow border label='Height'>
        <ComplexAttribute
          name={`${name}.height`}
          attribute={config.height}
          onChange={this.props.onChange}
        />
      </GridRow>

      <GridRow label='' compact={true}>
        <ButtonLink name={config.id} onClick={this.props.onRemove}>remove annotation</ButtonLink>
      </GridRow>

    </Fragment>
  }
}

export default Annotation