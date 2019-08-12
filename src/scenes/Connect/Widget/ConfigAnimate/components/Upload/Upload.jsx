import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from 'semantic-ui-react'

import Uploader from './Uploader'
import Updater from './Updater'

import { populateAnimate } from '@actions'
import GridRow from '@components/GridRow'

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

  handleUpload(js, hash, root, components) {
    if (this.props.animate.populated === false) {
      this.props.populateAnimate(this.props.animate.id, js, hash, root, components)
      return
    }

    this.setState({
      uploader: false,
      updater: true,
      uploaded: { js, hash, root, components }
    })
  }

  render() {
    return <GridRow label='Upload Animate'>
      { this.state.uploader &&
        <Uploader onUpload={this.handleUpload} />}

      {this.state.updater &&
        <Updater id={this.props.animate.id}
          onUpdate={this.handleUpdate} upload={this.state.uploaded}/>}
    </GridRow>
  }
}

export default connect(null,
  dispatch => bindActionCreators({
    populateAnimate
  }, dispatch)
)(Upload)
