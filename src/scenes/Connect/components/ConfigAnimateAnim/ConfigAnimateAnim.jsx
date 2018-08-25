import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Checkbox, Header, Grid, Divider } from 'semantic-ui-react'

import ContinuousMode from './ContinuousMode'
import ControlledMode from './ControlledMode'

import AnimateAnimMode from '@helpers/AnimateAnimMode'

import { configGetAnimateAnim } from '@reducers'
import { updateConfig } from '@actions'

import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'

class ConfigAnimateAnim extends Component {
  constructor (props) {
    super(props)

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined' && name !== 'mode') {
      value = checked
    }
    this.props.updateConfig(this.props.anim, name, value)
  }

  render () {
    const config = this.props.config

    return (
      <div>
        <Header as="h2">Anim: {this.props.anim.name}</Header>

        <Grid verticalAlign='middle' celled='internally'>
          <GridRow label='Mode:'>
            <Checkbox
              radio
              label='Controlled by value'
              name='mode'
              value={AnimateAnimMode.CONTROLLED}
              checked={config.mode === AnimateAnimMode.CONTROLLED}
              onClick={this.handleOnChange}
            />
            <br/>
            <br/>
            <Checkbox
              radio
              label='Always running'
              name='mode'
              value={AnimateAnimMode.CONTINUOUS}
              checked={config.mode === AnimateAnimMode.CONTINUOUS}
              onClick={this.handleOnChange}
            />

          </GridRow>
          <GridRow label='Value:'>
            <ComplexAttribute
              forceComplex={true}
              name='value'
              attribute={config.value}
              onChange={this.handleOnChange}
            />
          </GridRow>
        </Grid>

        {config.mode === AnimateAnimMode.CONTINUOUS && <ContinuousMode anim={this.props.anim}/>}
        {config.mode === AnimateAnimMode.CONTROLLED && <ControlledMode
          anim={this.props.anim}
          onChange={this.handleOnChange}
          config={config}
        />}
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    config: configGetAnimateAnim(state, props.anim.id)
  }),
  dispatch => bindActionCreators({
    updateConfig
  }, dispatch)
)(ConfigAnimateAnim)
