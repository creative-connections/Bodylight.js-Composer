import React, { Component, Fragment } from 'react'

import GridRow from '../../../GridRow'
import Collapsable from '../../../Collapsable'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'

import Annotation from './Annotation'

class Annotations extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleAdd() {
    let annotations = this.props.config || {}
    const id = generateID()

    const defaultConfig = {
      id,
      text: {
        typeof: 'string',
        value: 'annotation',
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      xref: 'paper',
      yref: 'paper',
      x: {
        typeof: 'number',
        value: 0,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      y: {
        typeof: 'number',
        value: 1,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
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
      // font
      family: {
        typeof: 'string',
        value: '',
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      size: {
        typeof: 'number',
        value: 12,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      color: {
        typeof: 'color',
        value: '#000',
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      bgcolor: {
        typeof: 'color',
        value: '',
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      bordercolor: {
        typeof: 'color',
        value: '',
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      width: {
        typeof: 'number',
        value: '',
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      height: {
        typeof: 'number',
        value: '',
        complex: false,
        provider: null,
        'function': 'value => value'
      },
    }

    annotations = update(annotations, {
      [id]: { $set: defaultConfig }
    })

    this.props.onChange(null, { name: this.props.name, value: annotations })
  }

  handleRemove(e, { name }) {
    const annotations = update(this.props.config, { $unset: [name] })
    this.props.onChange(e, { name: this.props.name, value: annotations })
  }

  renderAnnotations() {
    const out = []
    if (this.props.config == null) {
      return out
    }
    Object.entries(this.props.config).forEach(([id, annotation]) => {
      out.push(<Collapsable key={id} title={annotation.text.value} className='secondary' collapsed={true}>
        <Annotation
          name={`${this.props.name}.${id}`}
          config={annotation}
          onChange={this.props.onChange}
          onRemove={this.handleRemove}
        />
      </Collapsable>)
    })
    return out
  }

  render() {
    return <Fragment>
      {this.renderAnnotations()}
      <GridRow label='' compact={true}>
        <ButtonLink onClick={this.handleAdd}>Add annotation</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default Annotations