import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import { Checkbox, Rail, Form, Dropdown, Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

import ContinuousMode from './ContinuousMode'
import ControlledMode from './ControlledMode'

import AnimateAnimMode from '@helpers/AnimateAnimMode'
import PendingChangesButton from '@components/PendingChangesButton'

import update from 'immutability-helper'

import { configAnimateAnimUpdate } from '@actions/actions'

class AnimateAnimSettings extends Component {
  constructor (props) {
    super(props)
    this.handleModeChange = this.handleModeChange.bind(this)
    this.handleConfigChange = this.handleConfigChange.bind(this)
    this.renderContinuousMode = this.renderContinuousMode.bind(this)
    this.renderControlledMode = this.renderControlledMode.bind(this)
    this.handleConfigApply = this.handleConfigApply.bind(this)
    this.handleConfigCancel = this.handleConfigCancel.bind(this)

    var {config, loaded} = this.getConfig()
    var pending = !loaded // default config, has pending changes

    this.state = {
      config,
      pending,
      displayPendingChangesButton: true
    }
  }

  getConfig () {
    var out = {}
    if (
      this.props.configAnimateAnim[this.props.parent] !== undefined &&
      this.props.configAnimateAnim[this.props.parent][this.props.name] !== undefined
    ) {
      out.loaded = true
      out.config = this.props.configAnimateAnim[this.props.parent][this.props.name]
      return out
    }

    // No configuration created yet, fill with defaultConfigAnimateAnim
    out.loaded = false
    out.config = update(this.props.defaultConfigAnimateAnim, {})

    return out
  }

  handleModeChange (e, { value }) {
    this.setState({
      config: update(this.state.config, {mode: {$set: value}}),
      pending: true,
      displayPendingChangesButton: true
    })
  }

  handleConfigChange (e, {name, value, checked}) {
    if (this.state.config[name] === undefined) {
      toast.error(`${name} is not a valid configuration option for Animate Anim`)
      return
    }

    var config
    if (typeof checked === 'undefined') {
      config = update(this.state.config, {[name]: {$set: value}})
    } else {
      config = update(this.state.config, {[name]: {$set: checked}})
    }

    this.setState({
      config,
      pending: true,
      displayPendingChangesButton: true
    })
  }

  handleConfigApply () {
    this.props.configAnimateAnimUpdate(
      this.props.name,
      this.props.parent,
      this.state.config
    )

    this.setState({
      pending: false
    })
  }

  handleConfigCancel (e, v) {
    const {config} = this.getConfig()
    this.setState({
      config,
      displayPendingChangesButton: false
    })
  }

  renderControlledMode () {
    return <ControlledMode
      key={this.props.parent + this.props.name}
      config={this.state.config}
      onChange={this.handleConfigChange}/>
  }

  renderContinuousMode () {
    return <ContinuousMode
      key={this.props.parent + this.props.name}
      config={this.state.config}
      onChange={this.handleConfigChange}/>
  }

  render () {
    return (
      <Segment>
        <Header as="h2">{this.props.parent}.{this.props.name}</Header>
        <Form onSubmit={this.handleConfigApply}>
          <Form.Field>
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label='Controlled by value'
              name='mode'
              value={AnimateAnimMode.CONTROLLED}
              checked={this.state.config.mode === AnimateAnimMode.CONTROLLED}
              onChange={this.handleModeChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label='Always playing'
              name='mode'
              value={AnimateAnimMode.CONTINUOUS}
              checked={this.state.config.mode === AnimateAnimMode.CONTINUOUS}
              onChange={this.handleModeChange}
            />
          </Form.Field>
          { this.state.config.mode === AnimateAnimMode.CONTINUOUS && this.renderContinuousMode() }
          { this.state.config.mode === AnimateAnimMode.CONTROLLED && this.renderControlledMode() }

          <Divider hidden/>

        </Form>

        <PendingChangesButton
          display={this.state.displayPendingChangesButton}
          pending={this.state.pending}
          onCancel={this.handleConfigCancel}
          onApply={this.handleConfigApply} />
      </Segment>
    )
  }
}

function mapStateToProps ({ configAnimateAnim, defaultConfigAnimateAnim }) {
  return { configAnimateAnim, defaultConfigAnimateAnim }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({configAnimateAnimUpdate}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AnimateAnimSettings)
