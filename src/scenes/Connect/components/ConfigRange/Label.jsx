import React from 'react'
import { Form } from 'semantic-ui-react'
import InputFloat from '@components/form/InputFloat'

import FunctionEditor from '@components/FunctionEditor'

const renderOptions = (label, onChange) => {
  if (label.enabled === false) {
    return null
  }

  return (
    <div>
      <Form.Field>
        <label>{'Label transform function'}</label>
        <FunctionEditor
          name='transform'
          value={label.transform}
          onChange={onChange}
          typeof='number'
        />
      </Form.Field>
    </div>
  )
}

const Label = ({label, onChange}) => {
  return (
    <div>
      <Form.Field>
        <Form.Checkbox
          label='Display label'
          name='enabled'
          checked={label.enabled}
          onChange={onChange}
        />
      </Form.Field>

      {renderOptions(label, onChange)}
    </div>
  )
}

export default Label
