import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Checkbox, Header, Grid, Divider } from 'semantic-ui-react'

import ContinuousMode from './ContinuousMode'
import ControlledMode from './ControlledMode'

import AnimateAnimMode from '@helpers/AnimateAnimMode'

import { getConfigForAnimateAnim, getDefaultConfigForAnimateAnim } from '@reducers'
import { configAnimateAnimUpdate, configAnimateAnimRemove } from '@actions'

import GridRow from '../GridRow'

class ConfigAnimateAnim extends Component {
  constructor (props) {
    super(props)

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  getConfig () {
    if (this.props.config[this.props.anim.parent] === undefined ||
       this.props.config[this.props.anim.parent][this.props.anim.name] === undefined) {
      return this.props.defaultConfig
    }
    return this.props.config[this.props.anim.parent][this.props.anim.name]
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined' && name !== 'mode') {
      value = checked
    }
    this.props.configAnimateAnimUpdate(this.props.anim, name, value)
  }

  render () {
    const config = this.getConfig()

    return (
      <div>
        <Divider hidden/>
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
        </Grid>

        {config.mode === AnimateAnimMode.CONTINUOUS && <ContinuousMode anim={this.props.anim}/>}
      </div>
    )
  }
}

export default connect(
  state => ({
    config: getConfigForAnimateAnim(state),
    defaultConfig: getDefaultConfigForAnimateAnim()
  }),
  dispatch => bindActionCreators({
    configAnimateAnimRemove,
    configAnimateAnimUpdate
  }, dispatch)
)(ConfigAnimateAnim)
