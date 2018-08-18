import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Input, Checkbox, Header, Grid, Divider, Transition } from 'semantic-ui-react'
import { getConfigForButton, getDefaultConfigForButton, getAvailableButtonName } from '@reducers'
import { configButtonRemove, configButtonUpdate, renameButton, removeButton } from '@actions'

import ButtonLink from '@components/ButtonLink'
import ButtonMode from '@helpers/enum/ButtonMode'
import ValueProviders from '@helpers/ValueProviders'
import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'

class ConfigButton extends Component {
  constructor (props) {
    super(props)

    this.handleAutoRename = this.handleAutoRename.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.rename = this.rename.bind(this)
  }

  getConfig () {
    if (this.props.config[this.props.button.name] === undefined) {
      return this.props.defaultConfig
    }
    return this.props.config[this.props.button.name]
  }

  handleAutoRename () {
    let config = this.getConfig()
    const provider = ValueProviders.value(config.target.provider)
    const generatedName = this.props.getAvailableButtonName(`${provider.parent}.${provider.name}`)
    this.rename(null, {value: generatedName})
  }

  rename (e, {value}) {
    this.props.renameButton(this.props.button, value)
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined' && name !== 'mode') {
      value = checked
    }
    this.props.configButtonUpdate(this.props.button, name, value)
  }

  renderTarget (config) {
    return <GridRow label='Target:' key={`${this.props.button.name}.target`}>
      <ComplexAttribute
        forceComplex={true}
        disableFunction={true}
        name='target'
        attribute={config.target}
        onChange={this.handleOnChange}
      />
    </GridRow>
  }

  renderClickMode (config) {
    return [
      this.renderTarget(config),
      <GridRow label='On click:' key={`${this.props.button.name}.onClick`}>
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
      <GridRow label='On press:' key={`${this.props.button.name}.onPress`}>
        <ComplexAttribute
          name='onPress'
          attribute={config.onPress}
          onChange={this.handleOnChange}
        />
      </GridRow>,
      <GridRow label='On release:' key={`${this.props.button.name}.onRelease`}>
        <ComplexAttribute
          name='onRelease'
          attribute={config.onRelease}
          onChange={this.handleOnChange}
        />
      </GridRow>
    ]
  }

  render () {
    const config = this.getConfig()

    return (
      <div>
        <Divider hidden/>
        <Header as="h2">Button: {this.props.button.name}</Header>

        <Grid verticalAlign='middle' celled='internally'>
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

        </Grid>
        <br/>
        <Grid verticalAlign='middle' celled='internally'>
          <GridRow label='Mode:'>
            <Checkbox
              radio
              label='Value applied on click'
              name='mode'
              value={ButtonMode.CLICK}
              checked={config.mode === ButtonMode.CLICK}
              onClick={this.handleOnChange}
            />
            <br/><br/>
            <Checkbox
              radio
              label='Value applied while pressing'
              name='mode'
              value={ButtonMode.PRESS}
              checked={config.mode === ButtonMode.PRESS}
              onClick={this.handleOnChange}
            />
          </GridRow>
          { config.mode === ButtonMode.CLICK && this.renderClickMode(config)}
          { config.mode === ButtonMode.PRESS && this.renderPressMode(config)}
        </Grid>
        <br/>
        <Grid verticalAlign='middle' celled='internally'>
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

        </Grid>
      </div>
    )
  }
}

export default connect(
  state => ({
    config: getConfigForButton(state),
    defaultConfig: getDefaultConfigForButton(),
    getAvailableButtonName: root => getAvailableButtonName(state, root)
  }),
  dispatch => bindActionCreators({
    configButtonRemove,
    configButtonUpdate,
    renameButton,
    removeButton
  }, dispatch)
)(ConfigButton)
