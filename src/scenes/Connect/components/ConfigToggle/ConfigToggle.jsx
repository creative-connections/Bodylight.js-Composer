import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Input, Checkbox, Header, Grid, Transition } from 'semantic-ui-react'
import { configGetToggle } from '@reducers'
import { updateConfig, renameToggle } from '@actions'

import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'

import ButtonLink from '@components/ButtonLink'

import Events from '../Events'

class ConfigToggle extends Component {
  constructor (props) {
    super(props)

    this.handleAutoRename = this.handleAutoRename.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.rename = this.rename.bind(this)
  }

  handleAutoRename () {
    let config = this.props.config
    const provider = ValueProviders.value(config.target.provider)
    const generatedName = `${provider.parent}.${provider.name}`
    this.rename(null, {value: generatedName})
  }

  rename (e, {value}) {
    this.props.renameToggle(this.props.toggle, value)
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined' && name !== 'mode') {
      value = checked
    }
    this.props.updateConfig(this.props.toggle, name, value)
  }

  render () {
    const config = this.props.config

    return <Fragment>
      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='Name:'>
          <Input
            name='name'
            value={this.props.toggle.name}
            onChange={this.rename}
          />
          <Transition animation='slide up' duration={200} visible={config.target.provider !== null}>
            <ButtonLink onClick={this.handleAutoRename}>auto rename</ButtonLink>
          </Transition>
        </GridRow>
      </Grid>

      <br/>

      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='Target:' key={`target`}>
          <ComplexAttribute
            forceComplex={true}
            disableFunction={true}
            name='target'
            attribute={config.target}
            onChange={this.handleOnChange}
          />
        </GridRow>
        <GridRow label='On toggle ON:' key={`onToggleOn`}>
          <ComplexAttribute
            name='onToggleOn'
            attribute={config.onToggleOn}
            onChange={this.handleOnChange}
          />
        </GridRow>
        <GridRow label='On toggle OFF:' key={`onToggleOff`}>
          <ComplexAttribute
            name='onToggleOff'
            attribute={config.onToggleOff}
            onChange={this.handleOnChange}
          />
        </GridRow>
      </Grid>

      <br/>

      <Grid verticalAlign='middle' celled='internally'>
        <GridRow label='Enabled:'>
          <ComplexAttribute
            name='enabled'
            label='Toggle is enabled'
            attribute={config.enabled}
            onChange={this.handleOnChange}
          />
        </GridRow>
        <GridRow label='Visible:'>
          <ComplexAttribute
            name='visible'
            label='Toggle is visible'
            attribute={config.visible}
            onChange={this.handleOnChange}
          />
        </GridRow>
      </Grid>
      <Events
        widget={this.props.toggle}
        config={config}
      />
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetToggle(state, props.toggle.id)
  }),
  dispatch => bindActionCreators({
    updateConfig,
    renameToggle
  }, dispatch)
)(ConfigToggle)
