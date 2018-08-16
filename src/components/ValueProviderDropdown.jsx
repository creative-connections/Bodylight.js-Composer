import React, { Component } from 'react'

import { Dropdown, Button } from 'semantic-ui-react'

import ValueProviders from '@helpers/ValueProviders'

class ValueProviderDropdown extends Component {
  constructor (props) {
    super(props)

    const valueProviders = new ValueProviders()
    this.valueProvidersOptions = valueProviders.getForDropdown()
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
    return <Dropdown search button labeled floating className='icon'
      icon='code branch'
      style={{minWidth: '20em'}}
      text={this.getText()}
      options={this.valueProvidersOptions}
      name={this.props.name}
      value={this.props.value}
      onChange={this.props.onChange} >
    </Dropdown>
  }
}

export default ValueProviderDropdown
