import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import { Checkbox, Rail, Form, Dropdown, Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

import ValueProviderDropdown from '../ValueProviderDropdown'
import FunctionEditor from '@components/FunctionEditor'

import update from 'immutability-helper'

import { getConfigForRanges, getDefaultConfigForRanges } from '@reducers'

import { configRangeRemove, configRangeUpdate } from '@actions/actions'

class RangeSettings extends Component {
  constructor (props) {
    super(props)

    this.getConfig = this.getConfig.bind(this)
    this.handleConfigChange = this.handleConfigChange.bind(this)
    this.handleValueProviderOnClear = this.handleValueProviderOnClear.bind(this)
  }

  /**
   * Loads configuration for our props.name, if no such configuration exists
   * returns default configuration for Range.
   */
  getConfig () {
    if (this.props.config[this.props.name] === undefined) {
      return update(this.props.defaultConfig, {})
    }
    return this.props.config[this.props.name]
  }

  handleConfigChange (e, {name, value, checked}) {
    let config = this.getConfig()
    if (config[name] === undefined) {
      toast.error(`${name} is not a valid configuration option for Animate Text`)
    }

    config = update(config, {[name]: {$set: value}})

    this.props.configRangeUpdate(
      this.props.name,
      config
    )
  }

  handleValueProviderOnClear () {
    this.props.configRangeRemove(this.props.name)
  }

  render () {
    return (
      <Segment>
        <Header as="h2">Range: {this.props.name}</Header>
        <ValueProviderDropdown
          name='valueProvider'
          value={this.props.config.valueProvider}
          onChange={this.handleConfigChange}
          onClear={this.handleValueProviderOnClear}
        />
      </Segment>
    )
  }
}

export default connect(
  state => ({
    config: getConfigForRanges(state),
    defaultConfig: getDefaultConfigForRanges()
  }),
  dispatch => bindActionCreators({
    configRangeRemove,
    configRangeUpdate
  }, dispatch)
)(RangeSettings)
