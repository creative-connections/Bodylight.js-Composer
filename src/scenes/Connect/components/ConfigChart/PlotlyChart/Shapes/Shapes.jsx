import React, { Component, Fragment } from 'react'
import { Grid, Divider } from 'semantic-ui-react'

import GridRow from '../../../GridRow'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'

import Line from './Line'

class Shapes extends Component {
  constructor (props) {
    super(props)
    this.handleAddLine = this.handleAddLine.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleAddLine () {
    let shapes = this.props.config
    const id = generateID()

    const defaultConfig = {
      id,
      type: 'line',
      name: '',
      layer: 'above',
      visible: {
        typeof: 'boolean',
        value: true,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      opacity: {
        typeof: 'number',
        value: 1,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      xref: 'paper',
      yref: 'paper',
      x0: {
        typeof: 'number',
        value: 0,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      x1: {
        typeof: 'number',
        value: 1,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      y0: {
        typeof: 'number',
        value: 0,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      y1: {
        typeof: 'number',
        value: 1,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      color: {
        typeof: 'color',
        value: '#FF0000',
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      width: {
        typeof: 'number',
        value: 1.5,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      dash: {
        typeof: 'string',
        value: 'solid',
        complex: false,
        provider: null,
        'function': 'value => value'
      }

    }

    shapes = update(shapes, {
      [id]: {$set: defaultConfig}
    })

    this.props.onChange(null, {name: this.props.name, value: shapes})
  }

  handleRemove (e, {name, value}) {
    const shapes = update(this.props.config, { $unset: [name] })
    this.props.onChange(e, {name: this.props.name, value: shapes})
  }

  renderShapes () {
    const out = []
    Object.entries(this.props.config).forEach(([id, shape]) => {
      if (shape.type === 'line') {
        out.push(
          <Line key={id}
            name={`${this.props.name}.${id}`}
            config={shape}
            onChange={this.props.onChange}
            onRemove={this.handleRemove}
          />
        )
      }
    })
    return out
  }

  render () {
    return <Fragment>
      {this.renderShapes()}
      <Divider hidden/>
      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='' compact={true}>
          <ButtonLink onClick={this.handleAddLine}>Add line</ButtonLink>
        </GridRow>
      </Grid>
    </Fragment>
  }
}

export default Shapes
