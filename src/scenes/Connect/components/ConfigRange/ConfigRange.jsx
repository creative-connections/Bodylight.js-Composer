import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import { Checkbox, Rail, Form, Dropdown, Header, Grid, Button, Divider, Transition, Segment } from 'semantic-ui-react'

import ValueProviderDropdown from '../ValueProviderDropdown'
import ValueProviders from '@helpers/ValueProviders'
import FunctionEditor from '@components/FunctionEditor'

import update from 'immutability-helper'

import { getConfigForRanges, getDefaultConfigForRanges } from '@reducers'

import { configRangeRemove, configRangeUpdate, renameRange, removeRange } from '@actions/actions'

class ConfigRange extends Component {
  constructor (props) {
    super(props)

    this.getConfig = this.getConfig.bind(this)
    this.handleConfigChange = this.handleConfigChange.bind(this)
    this.handleValueProviderOnClear = this.handleValueProviderOnClear.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.handleRename = this.handleRename.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  /**
   * Loads configuration for our props.name, if no such configuration exists
   * returns default configuration for Range.
   */
  getConfig () {
    if (this.props.config[this.props.range.name] === undefined) {
      return update(this.props.defaultConfig, {})
    }
    return this.props.config[this.props.range.name]
  }

  handleConfigChange (e, {name, value, checked}) {
    let config = this.getConfig()
    if (config[name] === undefined) {
      toast.error(`${name} is not a valid configuration option for Animate Text`)
    }

    config = update(config, {[name]: {$set: value}})

    this.props.configRangeUpdate(this.props.range, config)

    if (name === 'valueProvider') {
      const provider = ValueProviders.value(value)
      const generatedName = `${provider.parent}.${provider.name}`
      this.handleRename(null, {value: generatedName})
    }
  }

  handleValueProviderOnClear () {
    this.props.configRangeRemove(this.props.range)
  }

  handleRename (e, {value}) {
    this.props.renameRange(this.props.range, value)
  }

  handleRemove (e, {value}) {
    this.props.removeRange(this.props.range, value)
  }

  render () {
    const config = this.getConfig()
    return (
      <Segment>
        <Header as="h2">Range: {this.props.range.name}</Header>
        <ValueProviderDropdown
          name='valueProvider'
          value={config.valueProvider}
          onChange={this.handleConfigChange}
          onClear={this.handleValueProviderOnClear}
        />

        <Divider hidden/>

        { this.renderForm(config) }
        <Divider hidden/>

        <Button onClick={this.handleRemove}>Remove</Button>
      </Segment>
    )
  }

  renderForm (config) {
    if (config.valueProvider === null) {
      return null
    }

    return (
      <Form>
        <Form.Field>
          <Form.Input
            name='name'
            value={this.props.range.name}
            onChange={this.handleRename}
          />
        </Form.Field>
      </Form>
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
    configRangeUpdate,
    renameRange,
    removeRange
  }, dispatch)
)(ConfigRange)
