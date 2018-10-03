import React, { Fragment } from 'react'
import { Checkbox, Input } from 'semantic-ui-react'

import InputFloat from '@components/InputFloat'
import ButtonLink from '@components/ButtonLink'
import FunctionEditor from '@components/FunctionEditor'
import ColorPicker from '@components/ColorPicker'

import ProviderDropdown from './ProviderDropdown'

const renderValueInput = (name, label, attribute, onChange) => {
  if (attribute.typeof === 'number') {
    return <InputFloat
      className='inline-block'
      name={`${name}.value`}
      value={attribute.value}
      onChange={onChange}
      inverted
    />
  } else if (attribute.typeof === 'boolean') {
    return <Checkbox
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
      inverted
    />
  } else if (attribute.typeof === 'color') {
    return <ColorPicker
      className='inline-block'
      name={`${name}.value`}
      value={attribute.value}
      onChange={onChange}
    />
  }
  return `Attribute type ${attribute.typeof} is not implemented yet`
}

const renderComplexCheckbox = (name, attribute, onChange) => {
  return <div className='complex-checkbox'>
    <Checkbox
      label='provided'
      name={`${name}.complex`}
      checked={attribute.complex}
      onChange={onChange}
    />
  </div>
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
  return <Fragment>
    {renderValueInput(name, label, attribute, onChange)}
    {forceSimple === false && renderComplexCheckbox(name, attribute, onChange)}
  </Fragment>
}

const renderComplex = ({name, attribute, onChange, forceComplex = false, disableFunction = false}) => {
  return <Fragment>
    {renderProvider(name, attribute, onChange)}
    {!disableFunction && renderAddFunction(name, attribute, onChange)}
    {attribute.function !== null && renderFunction(name, attribute, onChange)}
    {forceComplex === false && renderComplexCheckbox(name, attribute, onChange)}
  </Fragment>
}

const ComplexAttribute = (props) => {
  if (props.forceComplex === true) {
    return renderComplex(props)
  }
  if (props.forceSimple === true) {
    return renderSimple(props)
  }
  return (
    <Fragment>
      {props.attribute.complex && renderComplex(props)}
      {props.attribute.complex === false && renderSimple(props)}
    </Fragment>
  )
}

export default ComplexAttribute
