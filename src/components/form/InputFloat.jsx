import React from 'react'
import { Form } from 'semantic-ui-react'

const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')

const handleValidationOnChange = (e, v, onChange) => {
  const { value } = v
  if (value === '' || value === '-' || floatRegExp.test(value)) {
    onChange(e, v)
  }
}

const InputFloat = props => {
  if (typeof props.onChange !== 'function') {
    return <Form.Input { ...props } />
  }

  const { onChange, ...parentProps } = props

  return <Form.Input
    { ...parentProps }
    onChange={(e, v) => handleValidationOnChange(e, v, onChange)}
  />
}

export default InputFloat
