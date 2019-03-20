import React, { Component, Fragment } from 'react'

import update from 'immutability-helper'
import { Input, Dropdown } from 'semantic-ui-react'
import GridRow from '@components/GridRow'
import FunctionEditor from '@components/FunctionEditor'
import escodegen from 'escodegen'
import toAST from 'to-ast'

import Range from './Range'

class Axis extends Component {
  constructor(props) {
    super(props)

    const type = [
      { key: 'linear', text: 'linear', value: 'linear' },
      { key: 'log', text: 'log', value: 'log' }
    ]

    this.state = {
      options: {
        type
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  handleChange(e, { name, value }) {
    let config = update(this.props.config, {
      [name]: { $set: value }
    })
    this.props.onChange(e, {
      name: this.props.name,
      value: config
    })
  }

  handleEditorChange(e, { value }) {
    const fn = Function(`return ${value}`)()
    const config = fn()
    this.props.onChange(e, {
      name: this.props.name,
      value: config
    })
  }

  getConfigString() {
    const string = escodegen.generate(
      toAST(this.props.config), { format: { quotes: 'double' } }
    )
    return `() => (${string})`
  }

  render() {
    const config = this.getConfigString()

    return <Fragment>
      <GridRow label='Title'>
        <Input
          name='title'
          value={this.props.config.title}
          text={this.props.config.title}
          onChange={this.handleChange}
        />
      </GridRow>
      <GridRow inline label='Type'>
        <Dropdown
          name='type'
          value={this.props.config.type}
          text={this.props.config.type}
          options={this.state.options.type}
          onChange={this.handleChange}
        />
      </GridRow>
      <GridRow label='Advanced'>
        <FunctionEditor
          name={this.props.name}
          value={config}
          onChange={this.handleEditorChange}
          typeof='object'
          disableRemove={true}
        />
      </GridRow>
    </Fragment>
  }
}
export default Axis