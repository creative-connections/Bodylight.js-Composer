import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from '@components/Dropdown'
import { getProvidersForDropdown } from '@reducers'

class ProviderDropdown extends Component {
  constructor (props) {
    super(props)
    this.getText = this.getText.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.value !== this.props.value ||
    nextProps.name !== this.props.name) {
      return true
    }
    return false
  }

  getText () {
    if (this.props.value) {
      return undefined
    }
    if (this.props.placeholder) {
      return this.props.placeholder
    }
    return 'Select provider'
  }

  render () {
    return <Dropdown search button labeled floating
      className='icon provider-dropdown'
      icon='code branch'
      text={this.getText()}
      options={this.props.options}
      name={this.props.name}
      value={this.props.value}
      onChange={this.props.onChange} >
    </Dropdown>
  }
}

export default connect(
  (state, props) => ({
    options: getProvidersForDropdown(state)
  }),
  null
)(ProviderDropdown)
