import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import WidgetMenu from '@components/WidgetMenu'

import Uploader from './Uploader'
import Updater from './Updater'

class AddAnimate extends Component {
  constructor (props) {
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

  handleUpdate (success = false) {
    if (success) {
      this.props.history.push(`${process.env.PATH}/design`)
    } else {
      this.setState(this.defaultState)
    }
  }

  handleUpload (js, hash, root, components) {
    this.setState({
      uploader: false,
      updater: true,
      uploaded: { js, hash, root, components }
    })
  }

  render () {
    return <Fragment>
      <div id='topBar' className='header'/>
      <Grid padded centered className='leftShadow topPadded'>
        <Grid.Row centered padded='horizontally' className='notPadded'>
          {this.state.uploader && <Uploader onUpload={this.handleUpload} />}
          {this.state.updater && <Updater id={this.props.match.params.id} onUpdate={this.handleUpdate} upload={this.state.uploaded}/>}
        </Grid.Row>
      </Grid>
    </Fragment>
  }
}

export default connect(null, null)(AddAnimate)
