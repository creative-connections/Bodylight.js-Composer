import React, { Component, Fragment } from 'react'

import GridRow from '../GridRow'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTickersForDropdown, } from '@reducers'
import { addTicker, removeTicker } from '@actions'

class TickerList extends Component {
  constructor (props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getOptions() {
    const options = []
    options.push(<option key='none' value={null}>none</option>)
    Object.values(this.props.tickers).forEach(ticker => {
      options.push(
        <option key={ticker.id} value={ticker.id}>
          {ticker.name}
        </option>
      )
    })
    return options
  }

  handleAdd() {
    this.props.addTicker()
  }

  handleRemove() {
    this.props.removeTicker(this.props.value)
  }

  handleChange(e) {
    const value = e.target.value
    const name = this.props.name
    this.props.onChange(e, {name, value})
  }

  render() {
    return <Fragment>
      <GridRow label='Ticker'>
        <select value={this.props.value} onChange={this.handleChange}>
          {this.getOptions()}
        </select>
        <button onClick={this.handleAdd}>+</button>
        <button onClick={this.handleRemove}>remove</button>
      </GridRow>
    </Fragment>
  }
}

export default connect(
  state => ({
    tickers: getTickersForDropdown(state),
  }),
  dispatch => bindActionCreators({
    addTicker, removeTicker
  }, dispatch)
)(TickerList)
