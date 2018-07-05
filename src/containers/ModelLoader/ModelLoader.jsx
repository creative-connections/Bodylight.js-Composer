import React, {Component} from 'react'
import { connect } from 'react-redux'

import ModelInfo from './ModelInfo'
import DropZone from './DropZone'

import unzipModel from './unzipModel'

import ModelDescriptionParser from '../../helpers/ModelDescriptionParser'
import BusySignal from '../../components/BusySignal'

import NegativeOrPositiveButton from '../../components/NegativeOrPositiveButton'

import { toast } from 'react-toastify'

import { Transition, Grid, Segment, Button, Header } from 'semantic-ui-react'

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
    this.props.closeCB()
    this.setState(this.initialState)
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
      this.setState({
        displayDropZone: true
      })
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
    return (
      <Transition visible={this.props.isOpen} animation='slide down' duration={150}>
        <div>

          <DropZone display={this.state.displayDropZone}
            onDropAccepted={this.zipUploaded}
            onDropRejected={this.fileRejected}
          />

          <BusySignal isBusy={this.state.pendingExtraction}>
            <ModelInfo modelDescriptionParser={this.state.modelDescriptionParser}/>
          </BusySignal>

          <NegativeOrPositiveButton negativeOnClick={this.cancelModelLoad}/>
        </div>
      </Transition>
    )
  }
}

function mapStateToProps ({ models }) {
  return { models }
}
export default connect(mapStateToProps)(ModelLoader)
