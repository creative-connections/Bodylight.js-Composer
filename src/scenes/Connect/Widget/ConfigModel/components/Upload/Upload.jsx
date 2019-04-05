import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { populateModel } from '@actions'
import GridRow from '@components/GridRow'

import Uploader from './Uploader'

class Upload extends Component {
  constructor(props) {
    super(props)
    this.defaultState = {
      uploader: true,
      updater: false,
      uploaded: null
    }

    this.state = this.defaultState
    this.handleUpload = this.handleUpload.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(success = false) {
    if (!success) {
      this.setState(this.defaultState)
    }
  }

  handleUpload() {
  }

  render() {
    return <Fragment>
      <GridRow label='Upload model'>
        <Uploader model={this.props.model}/>
      </GridRow>
    </Fragment>
  }
}

export default connect(null, dispatch => bindActionCreators({
  populateModel
}, dispatch))(Upload)
