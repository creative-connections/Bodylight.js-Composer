import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Checkbox } from 'semantic-ui-react'

import { updateConfig, renameModel } from '@actions'
import { configGetModel } from '@reducers'
import ModelInfo from './ModelInfo'
import ModelMode from '@enum/ModelMode'
import InputFloat from '@components/InputFloat'
import GridRow from '@components/GridRow'

import ConfigTicker from '../ConfigTicker'
import TickerList from '../ConfigTicker/TickerList'

import Upload from './components/Upload'

class ConfigModel extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renameModel = this.renameModel.bind(this)
  }

  handleOnChange(e, { name, value, checked }) {
    if (typeof checked !== 'undefined' && name !== 'mode') {
      value = checked
    }
    this.props.updateConfig(this.props.model, name, value)
  }

  renameModel(e, { value }) {
    this.props.renameModel(this.props.model, value)
  }

  renderTps(config) {
    const tps = 1000 / config.interval
    const factor = tps * config.stepSize
    return `${tps} tps (${factor}x)`
  }

  renderContinuous(config) {
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

      <GridRow>
        <Checkbox
          label='Stop time'
          name='stopAtStopTime'
          checked={config.stopAtStopTime === true}
          onClick={this.handleOnChange}
        />
      </GridRow>

      { config.stopAtStopTime && <GridRow label='Stop time'>
        <InputFloat
          name='stopTime'
          value={config.stopTime}
          onChange={this.handleOnChange}>
          <input />
        </InputFloat>
      </GridRow> }

      <GridRow label='Ticks per second'>
        {this.renderTps(config)}
      </GridRow>
    </Fragment>
  }

  renderOneshot(config) {
    return <Fragment>
      <GridRow label=''>
        <Checkbox
          label='Recreate model on change'
          name='destroyOnReset'
          checked={config.destroyOnReset}
          onClick={this.handleOnChange}
        />
      </GridRow>

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
    </Fragment>
  }

  renderTicked(config) {
    return <GridRow>
      <TickerList
        name='ticker'
        value={config.ticker}
        onChange={this.handleOnChange}
      />
      <ConfigTicker ticker={config.ticker}/>
    </GridRow>
  }

  renderUpload() {
    return <Upload model={this.props.widget}/>
  }

  render() {
    if (this.props.widget.populated === false || this.state.upgrade) {
      return this.renderUpload()
    }

    const config = this.props.config

    return <Fragment>
      <ModelInfo config={config}/>
      <GridRow label='Name'>
        <Input
          name='name'
          value={this.props.model.name}
          onChange={this.renameModel}
        />
      </GridRow>
      <GridRow border label='Mode'>
        <div>
          <Checkbox
            radio
            label='Always running'
            name='mode'
            value={ModelMode.CONTINUOUS}
            checked={config.mode === ModelMode.CONTINUOUS}
            onClick={this.handleOnChange}
          />
          <Checkbox
            radio
            label='External tick'
            name='mode'
            value={ModelMode.TICKED}
            checked={config.mode === ModelMode.TICKED}
            onClick={this.handleOnChange}
          />
          <Checkbox
            radio
            label='One shot'
            name='mode'
            value={ModelMode.ONESHOT}
            checked={config.mode === ModelMode.ONESHOT}
            onClick={this.handleOnChange}
          />
        </div>
      </GridRow>
      { config.mode === ModelMode.CONTINUOUS && this.renderContinuous(config)}
      { config.mode === ModelMode.ONESHOT && this.renderOneshot(config)}
      { config.mode === ModelMode.TICKED && this.renderTicked(config)}
      <GridRow label='Tolerance'>
        <InputFloat
          name='tolerance'
          value={config.tolerance}
          onChange={this.handleOnChange}>
          <input />
        </InputFloat>
      </GridRow>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetModel(state, props.widget.id)
  }),
  dispatch => bindActionCreators({
    updateConfig,
    renameModel
  }, dispatch)
)(ConfigModel)
