import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import SimpleListSegment from '@components/SimpleListSegment'
import { Input } from 'semantic-ui-react'
import InputFloat from '@components/InputFloat'
import GridRow from '../../GridRow'
import { bindActionCreators } from 'redux'
import { updateConfig, renameAnimate, animateSetFps } from '@actions'
import { configGetAnimate, getAnimateFps } from '@reducers'

class AnimateInfo extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renameAnimate = this.renameAnimate.bind(this)
    this.handleOnChangeFps = this.handleOnChangeFps.bind(this)
  }

  handleOnChange(e, { name, value, checked }) {
    if (typeof checked !== 'undefined') {
      value = checked
    }
    this.props.updateConfig(this.props.animate, name, value)
  }

  renameAnimate(e, { value }) {
    this.props.renameAnimate(this.props.animate, value)
  }

  handleOnChangeFps(e, { value }) {
    this.props.animateSetFps(value)
  }

  transformElementsToArray(elements = {}) {
    const data = []
    Object.keys(elements).forEach((el) => {
      data.push(elements[el].name)
    })
    return data
  }

  render() {
    if (this.props.animate.populated === false) {
      return null
    }

    return <Fragment>
    <GridRow label='anims:'>
      <SimpleListSegment data={this.transformElementsToArray(this.props.animate.anims)}/>
    </GridRow>

    <GridRow label='texts:'>
      <SimpleListSegment data={this.transformElementsToArray(this.props.animate.texts)}/>
    </GridRow>

    <GridRow label='Name:'>
      <Input name='name' value={this.props.animate.name} onChange={this.renameAnimate} />
    </GridRow>

    <GridRow label='FPS:'>
      <p>This option is common to every Animate</p>
      <InputFloat name='fps' value={this.props.fps} onChange={this.handleOnChangeFps} />
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
)(AnimateInfo)