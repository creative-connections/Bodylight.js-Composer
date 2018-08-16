import React from 'react'
import { Form } from 'semantic-ui-react'
import InputFloat from '@components/InputFloat'

const renderInput = (initialValue, loadInitialValue, onChange) => {
  if (loadInitialValue === true) {
    return null
  }
  return <Form.Field>
    <label>Initial value</label>
    <InputFloat
      name='initialValue'
      value={initialValue}
      onChange={onChange}>
      <input />
    </InputFloat>
  </Form.Field>
}

const InitialValue = ({initialValue, loadInitialValue, onChange}) => {
  return (
    <div>
      <Form.Field >
        <Form.Checkbox
          label='Automatically load initial value from value provider'
          name='loadInitialValue'
          checked={loadInitialValue}
          onChange={onChange}
        />
      </Form.Field>
      {renderInput(initialValue, loadInitialValue, onChange)}
    </div>
  )
}

export default InitialValue
