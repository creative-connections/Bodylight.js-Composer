import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

import update from 'immutability-helper'

class AnimateOptions extends Component {
  constructor (props) {
    super(props)

    this.handleOptionsChange = this.handleOptionsChange.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOptionsChange (options) {
    this.props.onChange(options)
  }

  handleOnChange (e, {name, value}) {
    var insert = {}
    insert[name] = value
    const options = update(this.props.options, { $set: insert })
    this.props.onChange(options)
  }

  render () {
    if (this.props.options === null) {
      return null
    }

    return (
      <Form>
        <Form.Field>
          <label>Animate name (unique)</label>
          <Form.Input
            name='name'
            value={this.props.options.name}
            onChange={this.handleOnChange}
          >
            <input />
          </Form.Input>
        </Form.Field>
      </Form>
    )
  }
}

export default AnimateOptions
