import React, { Component } from 'react'

import { Form } from 'semantic-ui-react'

import ValueProviders from '@helpers/ValueProviders'

class ProviderDropdown extends Component {
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
      <Form.Field>
        <label>Provider</label>
        <Form.Dropdown fluid search selection
          placeholder='Value provider'
          options={this.valueProvidersOptions}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange} />
      </Form.Field>
    )
  }
}

export default ProviderDropdown
