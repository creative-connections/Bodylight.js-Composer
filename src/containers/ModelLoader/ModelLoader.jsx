import React, {Component} from 'react'
import { connect } from 'react-redux'

import Modal from 'react-modal'
import ModelInfo from './ModelInfo'
import DisplayNotice from '../DisplayNotice'
import DropZone from './DropZone'

import unzipModel from './unzipModel'

class ModelLoader extends Component {
  constructor (props) {
    super(props)

    Modal.setAppElement('#app')

    this.cancelModelLoad = this.cancelModelLoad.bind(this)
    this.zipUploaded = this.zipUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)

    this.initialState = {
      file: null,
      displayDropZone: true,
      hasError: false,
      errorMessage: '',
      pendingExtraction: false
    }

    this.state = this.initialState
  }

  cancelModelLoad () {
    this.setState(this.initialState)
    this.props.closeCB()
  }

  fileRejected (files) {
    const msg = `File '${files[0].name}' does not appear to be a .zip`
    this.setState({
      hasError: true,
      errorMessage: msg
    })
  }

  zipUploaded (files) {
    const file = files[0]

    this.setState({
      file: file,
      displayDropZone: false,
      hasError: false,
      pendingExtraction: true
    })

    unzipModel(file).then((vals) => {
    }).catch((err) => {
      this.setState({
        hasError: true,
        errorMessage: `Error while extracting zip file: ${err.message}`
      })
    }).finally(() => {
      this.setState({
        pendingExtraction: false
      })
    })
  }

  render () {
    if (!this.props.isOpen) {
      return null
    }

    return (
      <Modal isOpen={this.props.isOpen} onRequestClose={this.cancelModelLoad}
        contentLabel="Load model"
        className="modal" overlayClassName="modal-overlay" >

        <h2>Load a model</h2>

        <button onClick={this.cancelModelLoad}>cancel (todo: make me pretty)</button>

        <DropZone display={this.state.displayDropZone}
          onDropAccepted={this.zipUploaded}
          onDropRejected={this.fileRejected}
        />
        <ModelInfo file={this.state.file} isDone={!this.state.pendingExtraction} />

        <DisplayNotice display={this.state.hasError} level='error' message={this.state.errorMessage} />

      </Modal>
    )
  }
}

function mapStateToProps ({ models }) {
  return { models }
}
export default connect(mapStateToProps)(ModelLoader)
