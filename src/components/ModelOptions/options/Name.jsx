import React, { Component } from 'react'
import { Input, Label, Form } from 'semantic-ui-react'

class Name extends Component {
  render () {
    return (
      <Form.Field onMouseEnter={(e) => this.props.onMouseEnter('name')}>
        <label>Model name (unique)</label>
        <Input
          name='name'
          value={this.props.optionsename}
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
