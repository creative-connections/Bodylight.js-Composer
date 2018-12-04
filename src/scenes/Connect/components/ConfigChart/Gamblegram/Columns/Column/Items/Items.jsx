import React, { Component, Fragment } from 'react'

import GridRow from '@scenes/Connect/components/GridRow'
import Collapsable from '@scenes/Connect/components/Collapsable'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'
import memoize from 'fast-memoize'

import Item from './Item'

class Items extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.sort = memoize(this.sort.bind(this))
  }

  getLastPosition() {
    let index = 0
    Object.values(this.props.config).forEach(item => {
      index = item.position > index ? item.position : index
    })
    return index
  }

  sort(items) {
    return Object.values(items).sort((a, b) => a.position - b.position)
  }

  handleAdd() {
    let items = this.props.config
    const id = generateID()
    const position = this.getLastPosition() + 1
    const defaultConfig = {
      id,
      position,
      name: `item ${position}`,
      other: '() => ({})',
      value: {
        typeof: 'number',
        value: 0,
        time: true,
        provider: null,
        array: false,
        indexes: null,
        'function': null
      },
    }

    items = update(items, {
      [id]: { $set: defaultConfig }
    })

    this.props.onChange(null, { name: this.props.name, value: items })
  }

  handleRemove(e, { name }) {
    const items = update(this.props.config, { $unset: [name] })
    this.props.onChange(e, { name: this.props.name, value: items })
  }

  renderItems() {
    const out = []
    this.sort(this.props.config).forEach(item => {
      out.push(
        <Collapsable title={item.name} className='tertiary' collapsed={true} key={item.id} >
          <Item
            name={`${this.props.name}.${item.id}`}
            config={item}
            onChange={this.props.onChange}
            onRemove={this.handleRemove}
          />
        </Collapsable>
      )
    })
    return out
  }

  render() {
    return <Fragment>
      {this.renderItems()}

      <GridRow border label='' compact={true}>
        <ButtonLink onClick={this.handleAdd}>Add item</ButtonLink>
      </GridRow>

    </Fragment>
  }
}

export default Items