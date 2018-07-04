import React, {Component} from 'react'
import { connect } from 'react-redux'

import Modal from 'react-modal'
import ModelInfo from './ModelInfo'
import DropZone from './DropZone'

import unzipModel from './unzipModel'

import ModelDescriptionParser from '../../helpers/ModelDescriptionParser'

import { toast } from 'react-toastify'

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
    toast.error(msg)
    this.setState({file: null})
  }

  zipUploaded (files) {
    const file = files[0]

    this.setState({
      file: file,
      displayDropZone: false,
      pendingExtraction: true
    })

    unzipModel(file).then((vals) => {
      const modelDescription = vals['modelDescription']
      var parser = new ModelDescriptionParser()
      parser.parse(modelDescription)
    }).catch((err) => {
      const msg = `Error while extracting zip file: ${err.message}`
      toast.error(msg)
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

      </Modal>
    )
  }
}

function mapStateToProps ({ models }) {
  return { models }
}
export default connect(mapStateToProps)(ModelLoader)
