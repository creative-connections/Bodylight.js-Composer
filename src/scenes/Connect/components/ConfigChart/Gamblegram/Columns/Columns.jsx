import React, { Component, Fragment } from 'react'
import { Grid, Divider } from 'semantic-ui-react'

import GridRow from '@scenes/Connect/components/GridRow'
import Collapsable from '@scenes/Connect/components/Collapsable'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'
import memoize from 'fast-memoize'

import Column from './Column'

class Columns extends Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.sort = memoize(this.sort.bind(this))
  }

  getLastPosition() {
    let index = 0
    Object.values(this.props.config).forEach(column => {
      index = column.position > index ? column.position : index
    })
    return index
  }

  sort(columns) {
    return Object.values(columns).sort((a, b) => a.position - b.position)
  }

  handleAdd() {
    let columns = this.props.config
    const id = generateID()
    const position = this.getLastPosition() + 1
    const defaultConfig = {
      id,
      position,
      name: `column ${position}`,
      items: {},
      other: '() => ({})'
    }

    columns = update(columns, {
      [id]: { $set: defaultConfig }
    })

    this.props.onChange(null, { name: this.props.name, value: columns })
  }

  handleRemove(e, { name }) {
    const columns = update(this.props.config, { $unset: [name] })
    this.props.onChange(e, { name: this.props.name, value: columns })
  }

  renderColumns() {
    const out = []
    this.sort(this.props.config).forEach(column => {
      out.push(
        <Collapsable title={column.name} className='secondary' collapsed={true} key={column.id} >
          <Column
            name={`${this.props.name}.${column.id}`}
            config={column}
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
      {this.renderColumns()}

      <GridRow label='' compact={true}>
        <ButtonLink onClick={this.handleAdd}>Add column</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default Columns