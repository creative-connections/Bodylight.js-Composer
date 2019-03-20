import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridRow from '@components/GridRow'
import Collapsable from '@components/Collapsable'
import ButtonLink from '@components/ButtonLink'
import generateID from '@helpers/generateID'
import update from 'immutability-helper'
import { chartAddOption, chartRemoveOption } from '@actions'
import memoize from 'fast-memoize'

import Item from './Item'

class Items extends Component {
  constructor(props) {
    super(props)
    this.sort = memoize(this.sort.bind(this))
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
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

  add() {
    this.props.chartAddOption(this.props.chart, 'item', { idColumn: this.props.column.id })
  }

  remove(e, { name }) {
    this.props.chartRemoveOption(this.props.chart, 'item', name, { idColumn: this.props.column.id })
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
            onRemove={this.remove}
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
        <ButtonLink onClick={this.add}>Add item</ButtonLink>
      </GridRow>

    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ chartAddOption, chartRemoveOption }, dispatch)
)(Items)