import React, { Component } from 'react'

import { Dropdown, Header, Grid, Form, Checkbox, Button, Divider, Transition, Segment } from 'semantic-ui-react'

import FunctionEditor from '@components/FunctionEditor'
import InputFloat from '@components/InputFloat'

import ValueProviderDropdown from './ValueProviderDropdown'

/*
NOTE: This component should be only used in 'key'ed context
*/
class ControlledMode extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>

        <ValueProviderDropdown
          name='valueProvider'
          value={this.props.config.valueProvider}
          onChange={this.props.onChange} />

        <Form.Field>
          <label>{'Value transform function'}</label>
          <FunctionEditor
            name='transform'
            value={this.props.config.transform}
            onChange={this.props.onChange}
            typeof='number'
          />
        </Form.Field>

        <Form.Field >
          <label>Initial value</label>
          <InputFloat
            name='initialValue'
            value={this.props.config.initialValue}
            onChange={this.props.onChange}
          >
            <input />
          </InputFloat>
        </Form.Field>

        <Form.Field >
          <label>Minimum value</label>
          <InputFloat
            name='min'
            value={this.props.config.min}
            onChange={this.props.onChange}
          >
            <input />
          </InputFloat>
        </Form.Field>

        <Form.Field >
          <label>Maximum value</label>
          <InputFloat
            name='max'
            value={this.props.config.max}
            onChange={this.props.onChange}
          >
            <input />
          </InputFloat>
        </Form.Field>

        <Form.Field >
          <Form.Checkbox
            label='Automatically adjust min and max based on input value'
            name='overflow'
            checked={this.props.config.overflow}
            onChange={this.props.onChange}
          />
        </Form.Field>

        <Form.Field >
          <Form.Checkbox
            label='Reverse animation'
            name='reverse'
            checked={this.props.config.reverse}
            onChange={this.props.onChange}
          />
        </Form.Field>

      </div>
    )
  }
}

export default ControlledMode
