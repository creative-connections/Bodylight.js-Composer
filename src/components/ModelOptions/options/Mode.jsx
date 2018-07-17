import React, { Component } from 'react'
import { Radio, Form } from 'semantic-ui-react'

import update from 'immutability-helper'

class Mode extends Component {
  constructor (props) {
    super(props)

    this.state = {
      'options': props.options
    }

    this.handleModeChange = this.handleModeChange.bind(this)
  }

  handleModeChange (e, { value }) {
    const options = update(this.props.options, {$set: {mode: value}})

    this.props.onChange(options)
  }

  render () {
    return (
      <Form.Field onMouseEnter={(e) => this.props.onMouseEnter('mode')}>
        <label>Runtime mode</label>
        <Radio
          label='Continuous mode'
          name='mode'
          value='continuous'
          checked={this.props.options.mode === 'continuous'}
          onChange={this.handleModeChange}
        />
      </Form.Field>
    )
  }
}

export default Mode
