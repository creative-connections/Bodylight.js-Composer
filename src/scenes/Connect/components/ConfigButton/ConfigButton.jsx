import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Input, Checkbox, Header, Grid, Transition } from 'semantic-ui-react'
import { configGetButton } from '@reducers'
import { updateConfig, renameButton, removeButton } from '@actions'

import ButtonLink from '@components/ButtonLink'
import ButtonMode from '@helpers/enum/ButtonMode'
import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'

import Events from '../Events'

class ConfigButton extends Component {
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
    this.props.renameButton(this.props.button, value)
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined' && name !== 'mode') {
      value = checked
    }
    this.props.updateConfig(this.props.button, name, value)
  }

  renderTarget (config) {
    return <GridRow label='Target:' key={`target`}>
      <ComplexAttribute complex nofunc
        name='target'
        attribute={config.target}
        onChange={this.handleOnChange}
      />
    </GridRow>
  }

  renderClickMode (config) {
    return [
      this.renderTarget(config),
      <GridRow label='On click:' key={`onClick`}>
        <ComplexAttribute
          name='onClick'
          attribute={config.onClick}
          onChange={this.handleOnChange}
        />
      </GridRow>
    ]
  }

  renderPressMode (config) {
    return [
      this.renderTarget(config),
      <GridRow label='On press:' key={`onPress`}>
        <ComplexAttribute
          name='onPress'
          attribute={config.onPress}
          onChange={this.handleOnChange}
        />
      </GridRow>,
      <GridRow label='On release:' key={`onRelease`}>
        <ComplexAttribute
          name='onRelease'
          attribute={config.onRelease}
          onChange={this.handleOnChange}
        />
      </GridRow>
    ]
  }

  render () {
    const config = this.props.config

    return <Fragment>
      <GridRow label='Name:'>
        <Input
          name='name'
          value={this.props.button.name}
          onChange={this.rename}
        />
        <Transition animation='slide up' duration={200} visible={config.target.provider !== null}>
          <ButtonLink onClick={this.handleAutoRename}>auto rename</ButtonLink>
        </Transition>
      </GridRow>
      <GridRow label='Label:'>
        <ComplexAttribute
          name='label'
          attribute={config.label}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='Mode:'>
        <div>
          <Checkbox
            radio
            label='Value applied on click'
            name='mode'
            value={ButtonMode.CLICK}
            checked={config.mode === ButtonMode.CLICK}
            onClick={this.handleOnChange}
          />
          <Checkbox
            radio
            label='Value applied while pressed'
            name='mode'
            value={ButtonMode.PRESS}
            checked={config.mode === ButtonMode.PRESS}
            onClick={this.handleOnChange}
          />
          <Checkbox
            radio
            label='Button triggers an event'
            name='mode'
            value={ButtonMode.TRIGGER}
            checked={config.mode === ButtonMode.TRIGGER}
            onClick={this.handleOnChange}
          />
        </div>
      </GridRow>
      { config.mode === ButtonMode.CLICK && this.renderClickMode(config)}
      { config.mode === ButtonMode.PRESS && this.renderPressMode(config)}
      <GridRow label='Enabled:'>
        <ComplexAttribute
          name='enabled'
          label='Button is enabled'
          attribute={config.enabled}
          onChange={this.handleOnChange}
        />
      </GridRow>

      <GridRow label='Visible:'>
        <ComplexAttribute
          name='visible'
          label='Button is visible'
          attribute={config.visible}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <Events
        widget={this.props.button}
        config={config}
      />
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetButton(state, props.button.id)
  }),
  dispatch => bindActionCreators({
    updateConfig,
    renameButton,
    removeButton
  }, dispatch)
)(ConfigButton)
