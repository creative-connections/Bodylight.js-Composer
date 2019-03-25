import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GridRow from '@scenes/Connect/components/GridRow'
import Collapsable from '@scenes/Connect/components/Collapsable'
import ButtonLink from '@components/ButtonLink'
import memoize from 'fast-memoize'
import { chartAddOption, chartRemoveOption } from '@actions'
import Column from './Column'

class Columns extends Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
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

  add() {
    this.props.chartAddOption(this.props.chart, 'column')
  }

  remove(e, { name }) {
    this.props.chartRemoveOption(this.props.chart, 'column', name)
  }

  renderColumns() {
    const out = []
    this.sort(this.props.config).forEach(column => {
      out.push(
        <Collapsable title={column.name} className='secondary' collapsed={true} key={column.id} >
          <Column
            name={`${this.props.name}.${column.id}`}
            config={column}
            chart={this.props.chart}
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
      {this.renderColumns()}

      <GridRow border label='' compact={true}>
        <ButtonLink onClick={this.add}>Add column</ButtonLink>
      </GridRow>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ chartAddOption, chartRemoveOption }, dispatch)
)(Columns)