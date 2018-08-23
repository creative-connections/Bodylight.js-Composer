import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { configGetModel } from '@reducers'
import ModelInfo from './ModelInfo'

class ConfigModel extends Component {
  render () {
    console.log(this.props.config)
    return <Fragment>
      <ModelInfo config={this.props.config}/>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetModel(state, props.model.id)
  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(ConfigModel)
