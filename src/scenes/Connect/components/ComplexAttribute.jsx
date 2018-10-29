import React, { Component, Fragment } from 'react'
import { Checkbox, Input } from 'semantic-ui-react'

import InputFloat from '@components/InputFloat'
import ButtonLink from '@components/ButtonLink'
import FunctionEditor from '@components/FunctionEditor'
import ColorPicker from '@components/ColorPicker'

import ProviderDropdown from './ProviderDropdown'

class ComplexAttribute extends Component {
  constructor (props) {
    super(props)
    this.renderSimple = this.renderSimple.bind(this)
    this.renderComplex = this.renderComplex.bind(this)
    this.renderValueInput = this.renderValueInput.bind(this)
    this.renderComplexCheckbox = this.renderComplexCheckbox.bind(this)
    this.renderFunction = this.renderFunction.bind(this)
    this.addFunction = this.addFunction.bind(this)
  }

  renderValueInput () {
    const attribute = this.props.attribute
    const name = this.props.name
    const label = this.props.label

    if (attribute.typeof === 'number') {
      return <InputFloat
        className='inline-block'
        name={`${name}.value`}
        value={attribute.value}
        onChange={this.props.onChange}
        inverted
      />
    } else if (attribute.typeof === 'boolean') {
      return <Checkbox
        label={label}
        name={`${name}.value`}
        checked={attribute.value}
        onChange={this.props.onChange}
      />
    } else if (attribute.typeof === 'string') {
      return <Input
        className='inline-block'
        name={`${name}.value`}
        value={attribute.value}
        onChange={this.props.onChange}
        inverted
      />
    } else if (attribute.typeof === 'color') {
      return <ColorPicker
        className='inline-block'
        name={`${name}.value`}
        value={attribute.value}
        onChange={this.props.onChange}
      />
    }
    return `Attribute type ${attribute.typeof} is not implemented yet`
  }

  renderSimple () {
    if (this.props.attribute.complex || this.props.complex) {
      return null
    }
    return this.renderValueInput()
  }

  renderComplex () {
    if (!this.props.attribute.complex || this.props.simple) {
      return null
    }

    return <Fragment>
      <ProviderDropdown
        name={`${this.props.name}.provider`}
        value={this.props.attribute.provider}
        onChange={this.props.onChange}
      />
      {this.renderFunction()}
    </Fragment>
  }

  addFunction () {
    const values = {
      boolean: 'value => true;',
      number: 'value => value;',
      string: 'value => `${value}`'
    }

    this.props.onChange(null, {
      name: `${this.props.name}.function`,
      value: values[this.props.attribute.typeof]
    })
  }

  renderFunction () {
    if (this.props.nofunc) {
      return null
    }

    // render 'add function' button or function editor
    if (this.props.attribute.function === null) {
      return <ButtonLink onClick={() => this.addFunction()}>{'add function'}</ButtonLink>
    } else {
      return <FunctionEditor
        name={`${this.props.name}.function`}
        value={this.props.attribute.function}
        onChange={this.props.onChange}
        typeof={this.props.attribute.typeof}
      />
    }
  }

  renderComplexCheckbox () {
    // do not show when we are forcing either simple or complex
    if (this.props.simple || this.props.complex) {
      return null
    }

    return <div className='complex-checkbox'>
      <Checkbox label='provided'
        name={`${this.props.name}.complex`}
        checked={this.props.attribute.complex}
        onChange={this.props.onChange}
      />
    </div>
  }

  render () {
    return <Fragment>
      {this.renderSimple()}
      {this.renderComplex()}
      {this.renderComplexCheckbox()}
    </Fragment>
  }
}

export default ComplexAttribute
