import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { Grid } from 'semantic-ui-react'

import DropZone from '@components/DropZone'
import BusySignal from '@components/BusySignal'
import unzipAndValidate from './unzipAndValidate'
import parseModelDescription from './parseModelDescription'
import generateHash from '@helpers/generateHash'

class Uploader extends Component {
  constructor (props) {
    super(props)
    this.fileUploaded = this.fileUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.state = { pending: false }
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
        this.setState({ pending: false })
        this.props.onUpload(name, js, hash, modelDescription)
      })
    }).catch((err) => {
      const msg = `Error while extracting zip file: ${err.message}`
      toast.error(msg)
      this.setState({ pending: false })
      throw err
    })
  }

  render () {
    return <Fragment>
      <Grid.Column style={{ marginTop: '2em', width: '85%' }}>
        <BusySignal busy={this.state.pending} />
        <DropZone display={true}
          onDropAccepted={this.fileUploaded}
          onDropRejected={this.fileRejected}
          description='.zip file from the Bodylight.js compiler'
          accept='application/zip, application/x-zip, application/x-zip-compressed, multipart/x-zip, application/zip-compressed'
          imgSrc={`${process.env.PATH}/images/wafmi.png`}
        />
      </Grid.Column>
    </Fragment>
  }
}

export default connect(null, null)(Uploader)
