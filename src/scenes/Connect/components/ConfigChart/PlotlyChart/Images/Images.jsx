import React, { Component, Fragment } from 'react'

import GridRow from '../../../GridRow'
import Collapsable from '../../../Collapsable'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'

import Image from './Image'

class Images extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleAdd() {
    let images = this.props.config || {}
    const id = generateID()

    const defaultConfig = {
      id,
      name: '',
      xref: 'paper',
      yref: 'paper',
      source: '',
      sizing: 'contain',
      layer: 'below',
      xanchor: 'left',
      yanchor: 'top',
      x: {
        typeof: 'number',
        value: 0.5,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      y: {
        typeof: 'number',
        value: 0.5,
        complex: false,
        provider: null,
        'function': 'value => value'
      },

      sizey: {
        typeof: 'number',
        value: 1,
        complex: false,
        provider: null,
        'function': 'value => value'
      },
      sizex: {
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
    }
    images = update(images, {
      [id]: { $set: defaultConfig }
    })

    this.props.onChange(null, { name: this.props.name, value: images })
  }

  handleRemove(e, { name }) {
    const images = update(this.props.config, { $unset: [name] })
    this.props.onChange(e, { name: this.props.name, value: images })
  }

  renderImages() {
    const out = []
    if (this.props.config == null) {
      return out
    }
    Object.entries(this.props.config).forEach(([id, image]) => {
      out.push(<Collapsable key={id} title={image.name} className='secondary' collapsed={true}>
        <Image
          name={`${this.props.name}.${id}`}
          config={image}
          onChange={this.props.onChange}
          onRemove={this.handleRemove}
        />
      </Collapsable>)
    })
    return out
  }

  render() {
    return <Fragment>
      {this.renderImages()}
      <GridRow label='' compact={true}>
        <ButtonLink onClick={this.handleAdd}>Add image</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default Images