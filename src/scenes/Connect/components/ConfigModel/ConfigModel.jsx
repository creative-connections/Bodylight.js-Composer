import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Divider, Checkbox, Header, Grid, Transition } from 'semantic-ui-react'

import { updateConfig, renameModel } from '@actions'
import { configGetModel } from '@reducers'
import ModelInfo from './ModelInfo'
import ModelMode from '@helpers/enum/ModelMode'
import InputFloat from '@components/InputFloat'
import GridRow from '../GridRow'

class ConfigModel extends Component {
  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renameModel = this.renameModel.bind(this)
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined' && name !== 'mode') {
      value = checked
    }
    this.props.updateConfig(this.props.model, name, value)
  }

  renameModel (e, {value}) {
    this.props.renameModel(this.props.model, value)
  }

  renderTps (config) {
    const tps = 1000 / config.interval
    const factor = tps * config.stepSize
    return `${tps} tps (${factor}x)`
  }

  renderContinuous (config) {
    return <Fragment>
      <GridRow label='Step length [time]'>
        <InputFloat
          name='stepSize'
          value={config.stepSize}
          onChange={this.handleOnChange}>
          <input />
        </InputFloat>
      </GridRow>
      <GridRow label='Start time'>
        <InputFloat
          name='startTime'
          value={config.startTime}
          onChange={this.handleOnChange}>
          <input />
        </InputFloat>
      </GridRow>
      <GridRow label='Interval [ms]'>
        <InputFloat
          name='interval'
          value={config.interval}
          onChange={this.handleOnChange}>
          <input />
        </InputFloat>
      </GridRow>
      <GridRow label='Ticks per second'>
        {this.renderTps(config)}
      </GridRow>
    </Fragment>
  }

  renderOneshot (config) {
    return <Fragment>
      <GridRow label='Step length [time]'>
        <InputFloat
          name='stepSize'
          value={config.stepSize}
          onChange={this.handleOnChange}>
          <input />
        </InputFloat>
      </GridRow>
      <GridRow label='Start time'>
        <InputFloat
          name='startTime'
          value={config.startTime}
          onChange={this.handleOnChange}>
          <input />
        </InputFloat>
      </GridRow>
      <GridRow label='Stop time'>
        <InputFloat
          name='stopTime'
          value={config.stopTime}
          onChange={this.handleOnChange}>
          <input />
        </InputFloat>
      </GridRow>
      <GridRow label='Batch update count'>
        <InputFloat
          name='batch'
          value={config.batch}
          onChange={this.handleOnChange}>
          <input />
        </InputFloat>
      </GridRow>
    </Fragment>
  }

  renderTicked (config) {
    return <GridRow>
      <p>Not implemented yet</p>
    </GridRow>
  }

  render () {
    const config = this.props.config

    return <Fragment>
      <ModelInfo config={config}/>
      <Divider hidden/>
      <Grid verticalAlign='middle' celled='internally'>

        <GridRow label='Name:'>
          <Input
            name='name'
            value={this.props.model.name}
            onChange={this.renameModel}
          />
        </GridRow>
        <GridRow label='Mode:'>
          <Checkbox
            radio
            label='Always running'
            name='mode'
            value={ModelMode.CONTINUOUS}
            checked={config.mode === ModelMode.CONTINUOUS}
            onClick={this.handleOnChange}
          />
          <br/><br/>
          <Checkbox
            radio
            label='External tick'
            name='mode'
            value={ModelMode.TICKED}
            checked={config.mode === ModelMode.TICKED}
            onClick={this.handleOnChange}
          />
          <br/><br/>
          <Checkbox
            radio
            label='One shot'
            name='mode'
            value={ModelMode.ONESHOT}
            checked={config.mode === ModelMode.ONESHOT}
            onClick={this.handleOnChange}
          />
        </GridRow>
        { config.mode === ModelMode.CONTINUOUS && this.renderContinuous(config)}
        { config.mode === ModelMode.ONESHOT && this.renderOneshot(config)}
        { config.mode === ModelMode.TICKED && this.renderTicked(config)}
      </Grid>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetModel(state, props.model.id)
  }),
  dispatch => bindActionCreators({
    updateConfig,
    renameModel
  }, dispatch)
)(ConfigModel)
