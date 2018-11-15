import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input } from 'semantic-ui-react'
import { updateConfig, renameAnimate, animateSetFps } from '@actions'
import { configGetAnimate, getAnimateFps } from '@reducers'
import GridRow from '../GridRow'
import InputFloat from '@components/InputFloat'
import ButtonLink from '@components/ButtonLink'
import history from '@helpers/BrowserHistory'

import AnimateInfo from './AnimateInfo'

class ConfigAnimate extends Component {
  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renameAnimate = this.renameAnimate.bind(this)
    this.handleOnChangeFps = this.handleOnChangeFps.bind(this)

    this.handleOnClickUpgrade = this.handleOnClickUpgrade.bind(this)
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined') {
      value = checked
    }
    this.props.updateConfig(this.props.animate, name, value)
  }

  renameAnimate (e, {value}) {
    this.props.renameAnimate(this.props.animate, value)
  }

  handleOnChangeFps (e, {value}) {
    this.props.animateSetFps(value)
  }

  handleOnClickUpgrade() {
    history.push(`${process.env.PATH}/add/animate/${this.props.animate.id}`)
  }

  render () {
    return <Fragment>
      <AnimateInfo config={this.props.config} animate={this.props.animate}/>
      <GridRow label='Actions:'>
        <ButtonLink onClick={this.handleOnClickUpgrade}>Upgrade animate source</ButtonLink>
      </GridRow>

      <GridRow label='Name:'>
        <Input
          name='name'
          value={this.props.animate.name}
          onChange={this.renameAnimate}
        />
      </GridRow>

      <GridRow label='FPS:'>
        <p>This option is common to every Animate</p>
        <InputFloat
          name='fps'
          value={this.props.fps}
          onChange={this.handleOnChangeFps}
        />
      </GridRow>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetAnimate(state, props.animate.id),
    fps: getAnimateFps(state)
  }),
  dispatch => bindActionCreators({
    animateSetFps,
    updateConfig,
    renameAnimate
  }, dispatch)
)(ConfigAnimate)
