import React, { Component } from 'react'
import { Input, Label, Form } from 'semantic-ui-react'

class Name extends Component {
  render () {
    return (
      <Form.Field onMouseEnter={(e) => this.props.onMouseEnter('name')}>
        <Label>Model name (unique)</Label>
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
