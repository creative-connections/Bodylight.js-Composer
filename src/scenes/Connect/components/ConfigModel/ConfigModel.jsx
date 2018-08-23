import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ConfigModel extends Component {
  render () {
    return <Fragment>
      {'config model'}
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(ConfigModel)
