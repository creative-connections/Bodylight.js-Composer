import React, { Component } from 'react'
import { Radio, Form } from 'semantic-ui-react'

class Mode extends Component {
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
