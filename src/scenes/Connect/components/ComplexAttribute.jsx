import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Input, Icon } from 'semantic-ui-react'
import { getArrayProvidersFromProvider } from '@reducers'

import InputFloat from '@components/InputFloat'
import ButtonLink from '@components/ButtonLink'
import FunctionEditor from '@components/FunctionEditor'
import ColorPicker from '@components/ColorPicker'
import ModalIndexPicker from '@components/ModalIndexPicker'

import ProviderDropdown from './ProviderDropdown'

class ComplexAttribute extends Component {
  constructor(props) {
    super(props)
    this.onIsArrayChange = this.onIsArrayChange.bind(this)
    this.onChangeProvider = this.onChangeProvider.bind(this)
    this.toggleComplex = this.toggleComplex.bind(this)
    this.toggleFunction = this.toggleFunction.bind(this)
  }

  renderValueInput() {
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

  renderSimple() {
    if (this.props.attribute.complex === true || this.props.complex) {
      return null
    }
    return this.renderValueInput()
  }

  onChangeProvider(e, v) {
    // reset default states
    this.props.onChange(e, {
      name: `${this.props.name}.function`,
      value: null
    })
    this.props.onChange(e, {
      name: `${this.props.name}.indexes`,
      value: null
    })
    this.props.onChange(e, {
      name: `${this.props.name}.array`,
      value: false
    })
    this.props.onChange(e, v)
  }

  renderComplex() {
    if (this.props.attribute.complex === false || this.props.simple) {
      return null
    }

    return <Fragment>
      <ProviderDropdown
        name={`${this.props.name}.provider`}
        value={this.props.attribute.provider}
        onChange={this.onChangeProvider}
      />
    </Fragment>
  }

  renderFunction() {
    if (this.props.attribute.complex == false || this.props.attribute.function == null) {
      return null
    }

    return <div className='complex-row'>
      <FunctionEditor
        name={`${this.props.name}.function`}
        value={this.props.attribute.function}
        onChange={this.props.onChange}
        typeof={this.props.attribute.typeof}
        />
    </div>
  }

  onIsArrayChange(e, v) {
    // on array set, disable function
    if (v.checked === true) {
      this.props.onChange(e, {
        name: `${this.props.name}.function`,
        value: null
      })

      // select all providers by default
      this.props.onChange(e, {
        name: `${this.props.name}.indexes`,
        value: Object.values(this.props.arrayProviders).sort((a, b) => a.index - b.index).map(p => p.name)
      })
    }
    this.props.onChange(e, v)
  }

  renderArray() {
    if (!this.props.array || !this.props.attribute.provider ||
      typeof this.props.attribute.provider !== 'string') {
      return null
    }

    const id = JSON.parse(this.props.attribute.provider).id
    // find if the provider id ends with [#] - this is an array variable
    if (/.*\[[0-9]*\]$/.test(id) === false) {
      return null
    }

    return <Fragment>
      <div className='complex-row'>
        <Checkbox label={this.props.attribute.array ? '' : 'Array'}
          name={`${this.props.name}.array`}
          checked={this.props.attribute.array}
          onChange={this.onIsArrayChange}
        />
        {this.props.attribute.array &&
          <ModalIndexPicker
            name={`${this.props.name}.indexes`}
            attribute={this.props.attribute}
            onChange={this.props.onChange}
          />}
      </div>
    </Fragment>
  }

  toggleFunction(e) {
    const values = {
      boolean: 'value => true;',
      number: 'value => value;',
      string: 'value => `${value}`'
    }

    this.props.onChange(e, {
      name: `${this.props.name}.function`,
      value: this.props.attribute.function == null ? values[this.props.attribute.typeof] : null
    })
  }

  renderFunctionButton() {
    if (this.props.nofunc || this.props.attribute.complex === false || this.props.attribute.array) {
      return null
    }
    return <Icon name='file code' link
      className={this.props.attribute.function != null ? 'toggle-button active' : 'toggle-button'}
      onClick={this.toggleFunction}
    />
  }

  toggleComplex(e) {
    this.props.onChange(e, {
      name: `${this.props.name}.complex`,
      value: !this.props.attribute.complex
    })
  }

  renderComplexButton() {
    // do not show when we are forcing either simple or complex
    if (this.props.simple || this.props.complex) {
      return null
    }

    return <Icon name='code branch' link
      className={this.props.attribute.complex ? 'toggle-button active' : 'toggle-button'}
      onClick={this.toggleComplex}
    />
  }

  render() {
    return <Fragment>
      <div className='complex-attribute'>
        <div className='complex-row'>
          <div className='inputs'>
            {this.renderSimple()}
            {this.renderComplex()}
          </div>
          <div className='buttons'>
            {this.renderFunctionButton()}
            {this.renderComplexButton()}
          </div>
        </div>
        {this.renderArray()}
        {this.renderFunction()}
      </div>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    arrayProviders: getArrayProvidersFromProvider(state, props.attribute.provider)
  }),
  null
)(ComplexAttribute)