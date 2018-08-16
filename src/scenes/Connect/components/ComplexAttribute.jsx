import React from 'react'
import { Transition, Checkbox } from 'semantic-ui-react'

import InputFloat from '@components/InputFloat'
import ButtonLink from '@components/ButtonLink'
import FunctionEditor from '@components/FunctionEditor'

import ValueProviderDropdown from '@components/ValueProviderDropdown'

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
    <ValueProviderDropdown
      name={`${name}.provider`}
      value={attribute.provider}
      onChange={onChange}
    />
  )
}

const renderFunction = (name, attribute, onChange) => {
  return <Transition
    transitionOnMount={true}
    animation='slide right'
    duration={200}
    visible={true}>

    <div>
      <FunctionEditor
        name={`${name}.function`}
        value={attribute.function}
        onChange={onChange}
        typeof={attribute.typeof}
      />
      <ButtonLink onClick={() => removeFunction(name, attribute, onChange)}>{'remove function'}</ButtonLink>

    </div>
  </Transition>
}

const addFunction = (name, attribute, onChange) => {
  const values = {
    boolean: 'value => true;',
    number: 'value => value;'
  }

  onChange(null, {
    name: `${name}.function`,
    value: values[attribute.typeof]
  })
}

const removeFunction = (name, attribute, onChange) => {
  onChange(null, {
    name: `${name}.function`,
    value: null
  })
}

const renderAddFunction = (name, attribute, onChange) => {
  if (attribute.function !== null) {
    return null
  }
  return <ButtonLink onClick={() => addFunction(name, attribute, onChange)}>{'add function'}</ButtonLink>
}

const renderSimple = ({name, label, attribute, onChange}) => {
  return <Transition animation='slide right'
    transitionOnMount={true}
    duration={200}
    visible={true}>
    <div>
      {renderValueInput(name, label, attribute, onChange)}
      {renderComplexCheckbox(name, attribute, onChange)}
    </div>
  </Transition>
}

const renderComplex = ({name, attribute, forceComplex = false, onChange}) => {
  return <Transition transitionOnMount={true} animation='slide right'
    duration={200}
    visible={true}>
    <div>
      {renderProvider(name, attribute, onChange)}
      {renderAddFunction(name, attribute, onChange)}
      {forceComplex === false && renderComplexCheckbox(name, attribute, onChange)}
      <div>
        {attribute.function !== null && renderFunction(name, attribute, onChange)}
      </div>
    </div>
  </Transition>
}

const ComplexAttribute = (props) => {
  if (props.forceComplex === true) {
    return renderComplex(props)
  }
  return (
    <div>
      {props.attribute.complex && renderComplex(props)}
      {props.attribute.complex === false && renderSimple(props)}
    </div>
  )
}

export default ComplexAttribute
