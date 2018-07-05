import React, {Component} from 'react'
import { connect } from 'react-redux'

import ModelInfo from './ModelInfo'
import DropZone from './DropZone'

import unzipModel from './unzipModel'

import ModelDescriptionParser from '../../helpers/ModelDescriptionParser'
import BusySignal from '../../components/BusySignal'

import { toast } from 'react-toastify'

class ModelLoader extends Component {
  constructor (props) {
    super(props)

    this.cancelModelLoad = this.cancelModelLoad.bind(this)

    this.zipUploaded = this.zipUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)

    this.initialState = {
      modelDescriptionParser: null,
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
  }

  zipUploaded (files) {
    const file = files[0]

    this.setState({
      displayDropZone: false,
      pendingExtraction: true
    })

    unzipModel(file).then((vals) => {
      this.loadModel(vals)
    }).catch((err) => {
      const msg = `Error while extracting zip file: ${err.message}`
      toast.error(msg)
      throw err
    }).finally(() => {
      this.setState({
        pendingExtraction: false
      })
    })
  }

  loadModel (modelfiles) {
    const modelDescription = modelfiles['modelDescription']
    var modelDescriptionParser = new ModelDescriptionParser()
    modelDescriptionParser.parse(modelDescription)

    this.setState({modelDescriptionParser})
  }

  render () {
    if (!this.props.isOpen) {
      return null
    }

    return (
      <div>
        <h2>Load a model</h2>

        <button onClick={this.cancelModelLoad}>cancel (todo: make me pretty)</button>

        <DropZone display={this.state.displayDropZone}
          onDropAccepted={this.zipUploaded}
          onDropRejected={this.fileRejected}
        />
        <BusySignal isBusy={this.state.pendingExtraction}>
          <ModelInfo modelDescriptionParser={this.state.modelDescriptionParser}/>
        </BusySignal>
      </div>
    )
  }
}

function mapStateToProps ({ models }) {
  return { models }
}
export default connect(mapStateToProps)(ModelLoader)
