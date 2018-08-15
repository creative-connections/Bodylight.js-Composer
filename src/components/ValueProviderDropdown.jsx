import React, { Component } from 'react'

import { Form, Dropdown, Button } from 'semantic-ui-react'

import ValueProviders from '@helpers/ValueProviders'

class ValueProviderDropdown extends Component {
  constructor (props) {
    super(props)

    const valueProviders = new ValueProviders()
    this.valueProvidersOptions = valueProviders.getForDropdown()
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.value !== this.props.value ||
    nextProps.name !== this.props.name) {
      return true
    }
    return false
  }

  render () {
    return (
      <div style={{display: 'inline'}}>
        <Dropdown search selection
          style={{minWidth: '20em'}}
          placeholder='Value provider'
          options={this.valueProvidersOptions}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange} >
        </Dropdown>
        { this.props.value !== null && <Button onClick={this.props.onClear}>X</Button> }
      </div>
    )
  }
}

export default ValueProviderDropdown
