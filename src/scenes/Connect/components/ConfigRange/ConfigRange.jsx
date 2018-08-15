import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import { Checkbox, Rail, Form, Dropdown, Header, Grid, Button, Divider, Transition, Segment } from 'semantic-ui-react'

import ValueProviderDropdown from '@components/ValueProviderDropdown'
import ValueProviders from '@helpers/ValueProviders'
import FunctionEditor from '@components/FunctionEditor'

import InitialValue from './InitialValue'

import update from 'immutability-helper'
import InputFloat from '@components/form/InputFloat'

import ValueProvidedFunction from '@components/ValueProvidedFunction'

import { getConfigForRanges, getDefaultConfigForRanges } from '@reducers'

import { configRangeRemove, configRangeUpdate, renameRange, removeRange } from '@actions/actions'

class ConfigRange extends Component {
  constructor (props) {
    super(props)

    this.getConfig = this.getConfig.bind(this)
    this.handleConfigChange = this.handleConfigChange.bind(this)
    this.handleLabelChange = this.handleLabelChange.bind(this)
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
      console.log(this.props.defaultConfig)
      return update(this.props.defaultConfig, {})
    }
    return this.props.config[this.props.range.name]
  }

  handleConfigChange (e, {name, value, checked}) {
    let config = this.getConfig()
    if (config[name] === undefined) {
      toast.error(`${name} is not a valid configuration option for Range`)
    }

    if (typeof checked !== 'undefined') {
      value = checked
    }

    this.props.configRangeUpdate(this.props.range, name, value)

    if (name === 'valueProvider') {
      const provider = ValueProviders.value(value)
      const generatedName = `${provider.parent}.${provider.name}`
      this.handleRename(null, {value: generatedName})
    }
  }

  handleLabelChange (e, {name, value, checked}) {
    let config = this.getConfig()
    if (config.label[name] === undefined) {
      toast.error(`${name} is not a valid configuration option for Range`)
    }

    if (typeof checked === 'undefined') {
      config = update(config, {label: {[name]: {$set: value}}})
    } else {
      config = update(config, {label: {[name]: {$set: checked}}})
    }

    this.props.configRangeUpdate(this.props.range, config)
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
      <div>
        <Form>
          <Form.Field>
            <Form.Input
              label='Name'
              name='name'
              value={this.props.range.name}
              onChange={this.handleRename}
            />
          </Form.Field>

          <InitialValue
            initialValue={config.initialValue}
            loadInitialValue={config.loadInitialValue}
            onChange={this.handleConfigChange}/>

          <Form.Field>
            <label>{'Value transform function'}</label>
            <FunctionEditor
              name='transform'
              value={config.transform}
              onChange={this.handleConfigChange}
              typeof='number'
            />
          </Form.Field>

          <Form.Field >
            <label>Minimum value</label>
            <InputFloat
              name='min'
              value={config.min}
              onChange={this.handleConfigChange}
            >
              <input />
            </InputFloat>
          </Form.Field>

          <Form.Field >
            <label>Maximum value</label>
            <InputFloat
              name='max'
              value={config.max}
              onChange={this.handleConfigChange}
            >
              <input />
            </InputFloat>
          </Form.Field>
        </Form>

        <Divider hidden/>

        <label>Enabled</label>
        <ValueProvidedFunction
          name='enabled'
          value={config.enabled}
          provider={config.enabledProvider}
          onChange={this.handleConfigChange}
        />
      </div>
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
