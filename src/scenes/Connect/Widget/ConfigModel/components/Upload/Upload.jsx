import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import DropZone from '@components/DropZone'
import BusySignal from '@components/BusySignal'
import unzipAndValidate from './unzipAndValidate'
import parseModelDescription from './parseModelDescription'
import generateHash from '@helpers/generateHash'
import GridRow from '@components/GridRow'

import { populateModel, updateModel } from '@actions'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.fileUploaded = this.fileUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.state = { pending: false }
  }

  fileRejected(files) {
    const msg = `File '${files[0].name}' does not appear to be a .zip`
    toast.error(msg)
  }

  fileUploaded(files) {
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
        this.setState({ pending: false })
        if (this.props.model.populated === true) {
          this.props.updateModel(this.props.model.id, name, js, hash, modelDescription)
        }
        else {
          this.props.populateModel(this.props.model.id, name, js, hash, modelDescription)
        }
        this.props.onUpdate()
      })
    }).catch((err) => {
      const msg = `Error while extracting zip file: ${err.message}`
      toast.error(msg)
      this.setState({ pending: false })
      throw err
    })
  }

  render() {
    return <GridRow label='Upload model'>
      <BusySignal busy={this.state.pending} />
      <DropZone display={true}
        className='dropzone'
        onDropAccepted={this.fileUploaded}
        onDropRejected={this.fileRejected}
        description='.zip file from the Bodylight.js compiler'
        accept='application/zip, application/x-zip, application/x-zip-compressed, multipart/x-zip, application/zip-compressed'
      />
    </GridRow>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ populateModel, updateModel }, dispatch)
)(Uploader)
