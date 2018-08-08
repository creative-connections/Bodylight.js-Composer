import React, { Component } from 'react'

import { Form } from 'semantic-ui-react'

import PendingChangesButton from '@components/PendingChangesButton'

import toAST from 'to-ast'
import escodegen from 'escodegen'

const acorn = require('acorn')

/*
NOTE: This component should be only used in 'key'ed context, as it keeps a
      draft state, regardless of prop change.
*/
class FunctionEditor extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onApply = this.onApply.bind(this)
    this.onCancel = this.onCancel.bind(this)

    this.state = {
      pending: false,
      displayButton: false
    }
  }

  testrun (code, ast) {
    var generatedCode = escodegen.generate(ast)

    // try to run the code, TODO:sandbox

    const source = '"use strict"; return ' + generatedCode + ''
    const wrapperFunction = new Function(source)
    const actualFunction = wrapperFunction()
    const result = actualFunction(1)
    const typeofResult = typeof (result)

    const outputCode = escodegen.generate(toAST(actualFunction))

    if (typeofResult !== this.props.typeof) {
      const errorMessage = `The function does not return '${this.props.typeof}' on call of fun(1).
        Function body:
        ${outputCode}
        Result: >${result}< (${typeofResult})`
      throw new Error(errorMessage)
    }
    return {
      value: outputCode,
      error: false
    }
  }

  parse (code) {
    // try to parse and run user submitted code
    try {
      const ast = acorn.parse(code)
      return this.testrun(code, ast)
    } catch (exception) {
      console.error(exception)
      return {
        value: code,
        error: true
      }
    }
  }

  onChange (e, {value}) {
    this.setState({
      pendingValue: value,
      pending: true,
      displayButton: true
    })
  }

  onApply (e, v) {
    var {value, error} = this.parse(this.state.pendingValue)

    if (error) {
      return
    }

    this.props.onChange(e, {
      name: this.props.name,
      value: value
    })

    this.setState({
      pending: false,
      displayButton: true
    })
  }

  onCancel () {
    this.setState({
      pending: false,
      displayButton: false
    })
  }

  render () {
    var value
    var error

    // when we have a pending value, we will notify the user about any errors
    // but we will not change the actual input value, until onApply.
    //
    // In case the prop value changes during the lifetime, tough luck,
    // (use key attribute)
    if (this.state.pending) {
      const result = this.parse(this.state.pendingValue)
      value = this.state.pendingValue
      error = result.error
    } else {
      // else display the prop default value to the user
      const result = this.parse(this.props.value)
      value = result.value
      error = result.error
    }

    return (
      <div>
        <Form.Input
          placeholder='value => value'
          name={this.props.name}
          value={value}
          onChange={this.onChange}
          error={error}
        >

          <input/>

          <PendingChangesButton
            display={this.state.displayButton}
            error={error}
            pending={this.state.pending}
            onCancel={this.onCancel}
            onApply={this.onApply}
          />

        </Form.Input>
      </div>
    )
  }
}

export default FunctionEditor
