import React, { Component, Fragment } from 'react'
import { Dropdown, Input, Checkbox, Header, Grid, Divider, Transition } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getModelsForDropdown,
  getAnimateAnimsForDropdown,
  getAnimateTextsForDropdown,
  getButtonsForDropdown,
  getRangesForDropdown,
  getTogglesForDropdown

} from '@reducers'
import ArgumentType from '@helpers/enum/ArgumentType'

import update from 'immutability-helper'

class Args extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e, {name, value}) {
    const argumentID = name

    // get original Action definition
    const action = this.props.actions[this.props.action]
    // update the original argument definition with our value
    const argument = update(action.args[argumentID], {
      value: {$set: value}
    })

    this.props.onChange(e, {
      name: 'args',
      value: {
        id: argumentID,
        value: argument
      }
    })
  }

  renderArgument (id, argument) {
    let options = null
    let type = argument.type
    switch (argument.type) {
      case ArgumentType.MODEL:
        options = this.props.models
        break
      case ArgumentType.ANIMATE_ANIM:
        options = this.props.animateAnims
        break
      case ArgumentType.ANIMATE_TEXT:
        options = this.props.animateTexts
        break
      case ArgumentType.BUTTON:
        options = this.props.buttons
        break
      case ArgumentType.RANGE:
        options = this.props.ranges
        break
      case ArgumentType.TOGGLE:
        options = this.props.toggles
        break
    }

    return <Fragment key={id}>
      {`${type}:`}
      <Dropdown simple item inline
        style={{
          margin: '0.0em 0.4em 0.0em 0.2em',
          padding: '0.1em 0.0em 0.1em 0.6em',
          backgroundColor: '#E8E8E8'
        }}
        name={id}
        value={argument.value}
        options={options}
        onChange={this.onChange}
      />
      {''}
    </Fragment>
  }

  render () {
    if (this.props.action === null) {
      return null
    }
    const action = this.props.actions[this.props.action]
    const components = []
    for (let pos = 0; pos < action.args.length; pos++) {
      // retrieve original argument defition
      let argument = action.args[pos]
      // replace with our updated argument only if we have previously set
      if (this.props.args[pos] !== undefined && this.props.args[pos] !== null) {
        argument = this.props.args[pos]
      }
      components.push(this.renderArgument(pos, argument))
    }

    return components
  }
}

export default connect(
  state => ({
    models: getModelsForDropdown(state),
    animateAnims: getAnimateAnimsForDropdown(state),
    animateTexts: getAnimateTextsForDropdown(state),
    buttons: getButtonsForDropdown(state),
    ranges: getRangesForDropdown(state),
    toggles: getTogglesForDropdown(state)
  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(Args)
