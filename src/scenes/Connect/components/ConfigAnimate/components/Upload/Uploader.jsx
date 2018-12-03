import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import DropZone from '@components/DropZone'
import BusySignal from '@components/BusySignal'

import { addAnimate } from '@actions'

import Runtime from '@runtime/AnimateRuntime'
import preprocess from './preprocess'
import generateHash from '@helpers/generateHash'

class Uploader extends Component {
  constructor(props) {
    super(props)
    this.fileUploaded = this.fileUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.state = { pending: false }
  }

  fileRejected(files) {
    const msg = `File '${files[0].name}' does not appear to be a .js`
    toast.error(msg)
  }

  fileUploaded(files) {
    const file = files[0]

    const reader = new FileReader()
    reader.onloadend = () => {
      preprocess(reader.result).then(preprocessed => {
        const rootComponent = file.name.replace(/\.[^/.]+$/, '')
        const runnable = Runtime.functionalizeSource(preprocessed)
        const js = preprocessed

        Runtime.getComponentNames(runnable, rootComponent).then(components => {
          generateHash(js).then(hash => {
            this.setState({ pending: false })
            this.props.onUpload(js, hash, rootComponent, components)
          })
        }).catch(error => {
          console.error(error)
          if (error instanceof TypeError) {
            toast.error(`Could not load submitted js file, error: '${error.message}'.`)
            toast.info('.js file should be exported by Adobe Animate CC (2017, 2018)')
          } else if (error instanceof Error) {
            const msg = `Error while initializing animate component: ${error.message}.`
            toast.error(msg)
            toast.info('Name of the js file must correspond to the name of the topmost component')
          } else {
            toast.error(error.message)
          }
          this.setState({ pending: false })
        })
      })
    }
    this.setState({ pending: true })
    reader.readAsText(file)
  }

  render() {
    return <Fragment>
      <Grid.Column style={{ marginTop: '2em', width: '85%' }}>
        <BusySignal busy={this.state.pending} />
        <DropZone display={true}
          className='side-dropzone'
          onDropAccepted={this.fileUploaded}
          onDropRejected={this.fileRejected}
          description='HTML5 Canvas .js from Animate CC'
          accept='application/javascript, text/javascript, application/x-javascript'
          imgSrc={`${process.env.PATH}/images/an.png`}
        />
      </Grid.Column>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ addAnimate }, dispatch)
)(Uploader)