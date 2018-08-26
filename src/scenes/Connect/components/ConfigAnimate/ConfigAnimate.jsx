import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Divider, Checkbox, Header, Grid, Transition } from 'semantic-ui-react'

import { updateConfig, renameAnimate } from '@actions'
import { configGetAnimate } from '@reducers'
import InputFloat from '@components/InputFloat'
import GridRow from '../GridRow'

import AnimateInfo from './AnimateInfo'

class ConfigAnimate extends Component {
  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renameAnimate = this.renameAnimate.bind(this)
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

  render () {
    const config = this.props.config

    return <Fragment>
      <AnimateInfo config={config} animate={this.props.animate}/>
      <Divider hidden/>
      <Grid verticalAlign='middle' celled='internally'>

        <GridRow label='Name:'>
          <Input
            name='name'
            value={this.props.animate.name}
            onChange={this.renameAnimate}
          />
        </GridRow>
      </Grid>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetAnimate(state, props.animate.id)
  }),
  dispatch => bindActionCreators({
    updateConfig,
    renameAnimate
  }, dispatch)
)(ConfigAnimate)
