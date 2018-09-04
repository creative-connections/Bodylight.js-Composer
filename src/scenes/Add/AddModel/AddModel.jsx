import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import DropZone from '@components/DropZone'
import BusySignal from '@components/BusySignal'
import unzipAndValidate from './unzipAndValidate'
import parseModelDescription from './parseModelDescription'
import generateHash from '@helpers/generateHash'

import { addModel } from '@actions'

import WidgetMenu from '@components/WidgetMenu'

class AddModel extends Component {
  constructor (props) {
    super(props)
    this.fileUploaded = this.fileUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.state = {
      pending: false,
      redirect: false
    }
  }

  fileRejected (files) {
    const msg = `File '${files[0].name}' does not appear to be a .zip`
    toast.error(msg)
  }

  fileUploaded (files) {
    const file = files[0]
    this.setState({
      pending: true
    })
    unzipAndValidate(file).then((files) => {
      let name = files['name']
      let js = files['js']
      let modelDescription = files['modelDescription']
      modelDescription = parseModelDescription(modelDescription)
      generateHash(js).then(hash => {
        this.props.addModel(name, js, hash, modelDescription)
        this.setState({
          redirect: true,
          pending: false
        })
      })
    }).catch((err) => {
      const msg = `Error while extracting zip file: ${err.message}`
      toast.error(msg)
      this.setState({
        pending: false
      })
      throw err
    })
  }

  render () {
    return <Fragment>

      <div id='topBar' className='header'>
      </div>
      <Grid padded centered className='leftShadow topPadded'>
        <Grid.Row centered padded='horizontally' className='notPadded'>
          <Grid.Column style={{ marginTop: '2em', width: '85%' }}>
            <BusySignal busy={this.state.pending} />
            {this.state.redirect && <Redirect to={`${process.env.PATH}/`} />}
            <DropZone display={true}
              onDropAccepted={this.fileUploaded}
              onDropRejected={this.fileRejected}
              description='.zip file from the Bodylight.js compiler'
              accept='application/zip, application/x-zip, application/x-zip-compressed, multipart/x-zip, application/zip-compressed'
              imgSrc={`${process.env.PATH}/images/wafmi.png`}
            />
          </Grid.Column>
          <Grid.Column id='widget-menu' style={{ width: '15%' }}>
            <WidgetMenu/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ addModel }, dispatch)
)(AddModel)
