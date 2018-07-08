import React, {Component} from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { Divider, Transition } from 'semantic-ui-react'

import ModelInfo from './ModelInfo'
import DropZone from './DropZone'
import unzipModel from './unzipModel'

import ModelDescriptionParser from '@helpers/ModelDescriptionParser'

import ModelOptions from '@components/ModelOptions'
import BusySignal from '@components/BusySignal'
import NegativeOrPositiveButton from '@components/NegativeOrPositiveButton'

class ModelLoader extends Component {
  constructor (props) {
    super(props)

    this.cancelModelLoad = this.cancelModelLoad.bind(this)

    this.zipUploaded = this.zipUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.handleModelOptionsOnChange = this.handleModelOptionsOnChange.bind(this)
    this.addModel = this.addModel.bind(this)

    this.initialState = {
      modelDescriptionParser: null,
      displayDropZone: true,
      pendingExtraction: false
    }

    this.defaultModelOptions = {
      mode: 'continuous',
      interval: 50,
      stepSize: 0.05,
      runtoTime: 1
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
      pendingExtraction: true
    })

    unzipModel(file).then((vals) => {
      this.loadModel(vals)
      this.setState({
        displayDropZone: false
      })
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

    this.defaultModelOptions.name = modelfiles.name

    this.setState({
      name: modelfiles.name,
      js: modelfiles.js,
      wasm: modelfiles.wasm,
      modelDescriptionParser: modelDescriptionParser
    })
  }

  handleModelOptionsOnChange (options) {
    this.setState({
      modelOptions: options
    })
  }

  addModel () {

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
            <ModelInfo
              modelDescriptionParser={this.state.modelDescriptionParser}
            />

            <Divider hidden />

            <ModelOptions
              name={this.state.name}
              visible={this.state.modelDescriptionParser !== null}
              options={this.defaultModelOptions}
              onChange={this.handleModelOptionsOnChange}
            />
          </BusySignal>

          <Divider hidden />

          <NegativeOrPositiveButton
            positiveEnabled={this.state.modelDescriptionParser !== null}
            positiveLabel="Add model"
            positiveOnClick={this.addModel}
            negativeOnClick={this.cancelModelLoad}/>
        </div>
      </Transition>
    )
  }
}

function mapStateToProps ({ models }) {
  return { models }
}
export default connect(mapStateToProps)(ModelLoader)
