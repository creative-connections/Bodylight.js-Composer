import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { populateModel } from '@actions'
import GridRow from '@components/GridRow'

import Uploader from './Uploader'

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = this.defaultState
  }

  render() {
    return <Fragment>
      <GridRow label='Upload model'>
        <Uploader model={this.props.model} onUpdate={this.props.onUpdate}/>
      </GridRow>
    </Fragment>
  }
}

export default connect(null, dispatch => bindActionCreators({
  populateModel
}, dispatch))(Upload)
