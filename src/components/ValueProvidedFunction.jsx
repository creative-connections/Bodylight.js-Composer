import React, { Component } from 'react'

import { Form } from 'semantic-ui-react'
import ValueProviderDropdown from '@components/ValueProviderDropdown'
import FunctionEditor from '@components/FunctionEditor'

class ValueProvidedFunction extends Component {
  constructor (props) {
    super(props)

    this.handleProviderClear = this.handleProviderClear.bind(this)
    this.handleProviderSet = this.handleProviderSet.bind(this)
  }

  handleProviderSet (e, v) {
    this.props.onChange(e, v)

    // replace function signature from '() =>' to 'value =>'
    if (this.props.value.startsWith('() =>')) {
      const newValue = this.props.value.replace(/\(\) =>/, 'value =>')
      this.props.onChange(null, {
        name: this.props.name,
        value: newValue
      })
    }
  }

  handleProviderClear () {
    this.props.onChange(null, {
      name: `${this.props.name}Provider`,
      value: null
    })

    // replace function signature from 'value =>' to '() =>'
    if (this.props.value.startsWith('value =>')) {
      this.props.onChange(null, {
        name: this.props.name,
        value: this.props.value.replace(/^value =>/, '() =>')
      })
    }
  }

  render () {
    const name = this.props.name
    return (
      <div>

        <ValueProviderDropdown
          name={`${name}Provider`}
          value={this.props.provider}
          onChange={this.handleProviderSet}
          onClear={this.handleProviderClear}
        />

        <FunctionEditor
          name={name}
          value={this.props.value}
          onChange={this.props.onChange}
        />

      </div>
    )
  }
}

export default ValueProvidedFunction
