import React, { Component } from 'react'
import { Input, Label, Form } from 'semantic-ui-react'

class Name extends Component {
  constructor (props) {
    super(props)

    this.state = {
      'options': props.options
    }

    this.handleModeChange = this.handleModeChange.bind(this)
  }

  handleModeChange (e, { value }) {
    var options = Object.assign(this.props.options, {mode: value})

    this.props.onChange(options)
  }

  render () {
    return (
      <Form.Field onMouseEnter={(e) => this.props.onMouseEnter('name')}>
        <label>Model name (unique)</label>
        <Input
          name='name'
          value={this.props.options.name}
          onChange={this.handleChange}
          disabled
        >
          <input />
        </Input>
      </Form.Field>
    )
  }
}

export default Name
