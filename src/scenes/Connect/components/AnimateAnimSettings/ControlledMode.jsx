import React, { Component } from 'react'

import { Dropdown, Header, Grid, Form, Checkbox, Button, Divider, Transition, Segment } from 'semantic-ui-react'

import ValueProviders from '@helpers/ValueProviders'
import FunctionEditor from '@components/FunctionEditor'

/*
NOTE: This component should be only used in 'key'ed context
*/
class ControlledMode extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const valueProviders = new ValueProviders()
    var valueProvidersOptions = valueProviders.getForDropdown()

    return (
      <div>

        <Form.Field>
          <label>Provider</label>
          <Dropdown fluid search selection
            placeholder='Value provider'
            options={valueProvidersOptions}
            name='valueProvider'
            value={this.props.config.valueProvider}
            onChange={this.props.onChange} />
        </Form.Field>

        <Form.Field>
          <label>{'Value transform function'}</label>
          <FunctionEditor
            name='transform'
            value={this.props.config.transform}
            onChange={this.props.onChange}
          />

        </Form.Field>

      </div>
    )
  }
}

export default ControlledMode
