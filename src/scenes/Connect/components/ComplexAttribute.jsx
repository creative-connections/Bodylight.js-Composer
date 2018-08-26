import React from 'react'
import { Checkbox, Input, Fragment } from 'semantic-ui-react'

import InputFloat from '@components/InputFloat'
import ButtonLink from '@components/ButtonLink'
import FunctionEditor from '@components/FunctionEditor'

import ProviderDropdown from './ProviderDropdown'

const renderValueInput = (name, label, attribute, onChange) => {
  if (attribute.typeof === 'number') {
    return <InputFloat
      className='inline-block'
      name={`${name}.value`}
      value={attribute.value}
      onChange={onChange}
    />
  } else if (attribute.typeof === 'boolean') {
    return <Checkbox
      style={{padding: '0.8em 0em 0.8em 0em'}}
      label={label}
      name={`${name}.value`}
      checked={attribute.value}
      onChange={onChange}
    />
  } else if (attribute.typeof === 'string') {
    return <Input
      className='inline-block'
      name={`${name}.value`}
      value={attribute.value}
      onChange={onChange}
    />
  }
  return `Attribute type ${attribute.typeof} is not implemented yet`
}

const renderComplexCheckbox = (name, attribute, onChange) => {
  return <Checkbox
    style={{padding: '0.8em 0em 0.8em 1.75em'}}
    label='complex'
    name={`${name}.complex`}
    checked={attribute.complex}
    onChange={onChange}
  />
}

const renderProvider = (name, attribute, onChange) => {
  return (
    <ProviderDropdown
      name={`${name}.provider`}
      value={attribute.provider}
      onChange={onChange}
    />
  )
}

const renderFunction = (name, attribute, onChange) => {
  return <FunctionEditor
    name={`${name}.function`}
    value={attribute.function}
    onChange={onChange}
    typeof={attribute.typeof}
  />
}

const addFunction = (name, attribute, onChange) => {
  const values = {
    boolean: 'value => true;',
    number: 'value => value;',
    string: 'value => `${value}`'
  }

  onChange(null, {
    name: `${name}.function`,
    value: values[attribute.typeof]
  })
}

const renderAddFunction = (name, attribute, onChange) => {
  if (attribute.function !== null) {
    return null
  }
  return <ButtonLink onClick={() => addFunction(name, attribute, onChange)}>{'add function'}</ButtonLink>
}

const renderSimple = ({name, label, attribute, onChange, forceSimple = false}) => {
  return <div>
    {renderValueInput(name, label, attribute, onChange)}
    {forceSimple === false && renderComplexCheckbox(name, attribute, onChange)}
  </div>
}

const renderComplex = ({name, attribute, onChange, forceComplex = false, disableFunction = false}) => {
  return <div>
    {renderProvider(name, attribute, onChange)}
    {!disableFunction && renderAddFunction(name, attribute, onChange)}
    {forceComplex === false && renderComplexCheckbox(name, attribute, onChange)}
    <div>
      {attribute.function !== null && renderFunction(name, attribute, onChange)}
    </div>
  </div>
}

const ComplexAttribute = (props) => {
  if (props.forceComplex === true) {
    return renderComplex(props)
  }
  if (props.forceSimple === true) {
    return renderSimple(props)
  }
  return (
    <div>
      {props.attribute.complex && renderComplex(props)}
      {props.attribute.complex === false && renderSimple(props)}
    </div>
  )
}

export default ComplexAttribute
