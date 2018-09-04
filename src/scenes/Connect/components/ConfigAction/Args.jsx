import React, { Component, Fragment } from 'react'
import { Dropdown, Input } from 'semantic-ui-react'

import ButtonLink from '@components/ButtonLink'
import memoize from 'memoize-one'
import ArgumentType from '@helpers/enum/ArgumentType'
import update from 'immutability-helper'

class Args extends Component {
  constructor (props) {
    super(props)
    this.addArgument = this.addArgument.bind(this)
    this.removeLastArgument = this.removeLastArgument.bind(this)
    this.handleArgNameChange = this.handleArgNameChange.bind(this)
    this.handleArgTypeChange = this.handleArgTypeChange.bind(this)
    this.getArgumentsForDropdown = memoize(this.getArgumentsForDropdown)
  }

  getArgumentsForDropdown () {
    return [
      {value: ArgumentType.MODEL, text: 'Model'},
      {value: ArgumentType.ANIMATE_ANIM, text: 'Animate Anim'},
      {value: ArgumentType.ANIMATE_TEXT, text: 'Animate Text'},
      {value: ArgumentType.BUTTON, text: 'Button'},
      {value: ArgumentType.RANGE, text: 'Range'},
      {value: ArgumentType.TOGGLE, text: 'Toggle'},
      {value: ArgumentType.CHART, text: 'Chart'}
    ]
  }

  removeLastArgument (e, v) {
    let args = update(this.props.args, {
      [this.props.args.length - 1]: {$set: undefined},
      length: {$set: this.props.args.length - 1}
    })

    this.props.onChange(e, {
      name: this.props.name,
      value: args
    })
  }

  addArgument (e, v) {
    const arg = {
      name: 'unnamed',
      type: null,
      value: null
    }
    let args = update(this.props.args, {
      [this.props.args.length]: {$set: arg},
      length: {$set: this.props.args.length + 1}
    })

    this.props.onChange(e, {
      name: this.props.name,
      value: args
    })
  }

  handleArgNameChange (e, {name, value}) {
    let args = update(this.props.args, {
      [name]: {
        name: {$set: value}
      }
    })
    this.props.onChange(e, {
      name: this.props.name,
      value: args
    })
  }

  handleArgTypeChange (e, {name, value}) {
    let args = update(this.props.args, {
      [name]: {
        type: {$set: value}
      }
    })
    this.props.onChange(e, {
      name: this.props.name,
      value: args
    })
  }

  renderArguments () {
    const args = this.props.args
    const out = []
    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      out.push(
        <div key={i}>
          <Input
            name={i}
            value={arg.name}
            onChange={this.handleArgNameChange}
            style={{
              width: '10em',
              marginTop: '0.5em'
            }}
          />
          <Dropdown simple item inline
            name={i}
            style={{
              margin: '0.0em 0.4em 0.0em 0.2em',
              padding: '0.1em 0.0em 0.1em 0.6em',
              backgroundColor: '#E8E8E8'
            }}
            options={this.getArgumentsForDropdown()}
            onChange={this.handleArgTypeChange}
            value={arg.type}
          />
          {i === args.length - 1 && <ButtonLink className={'compact'} onClick={this.removeLastArgument}>x</ButtonLink> }
        </div>
      )
    }
    return out
  }

  render () {
    return <Fragment>
      {this.renderArguments()}
      <ButtonLink
        className={'compact'}
        onClick={this.addArgument}>Add argument</ButtonLink>
    </Fragment>
  }
}

export default Args
