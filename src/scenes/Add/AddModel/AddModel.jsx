import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import WidgetMenu from '@components/WidgetMenu'

import Uploader from './Uploader'
import Updater from './Updater'

class AddModel extends Component {
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
      this.props.history.push(`${process.env.PATH}/`)
    } else {
      this.setState(this.defaultState)
    }
  }

  handleUpload (name, js, hash, modelDescription) {
    this.setState({
      uploader: false,
      updater: true,
      uploaded: { name, js, hash, modelDescription }
    })
  }

  render () {
    return <Fragment>
      <div id='topBar' className='header'/>

      <Grid padded centered className='leftShadow topPadded'>
        <Grid.Row centered padded='horizontally' className='notPadded'>
          {this.state.uploader && <Uploader onUpload={this.handleUpload} />}
          {this.state.updater && <Updater onUpdate={this.handleUpdate} upload={this.state.uploaded}/>}

          <Grid.Column id='widget-menu' style={{ width: '15%' }}>
            <WidgetMenu/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  }
}

export default connect(null, null)(AddModel)
