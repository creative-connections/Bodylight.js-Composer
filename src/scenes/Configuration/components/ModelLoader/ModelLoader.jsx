import React, {Component} from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { Divider, Transition } from 'semantic-ui-react'

import ModelInfo from './ModelInfo'
import DropZone from '@components/DropZone'
import unzipModel from './unzipModel'

import parseModelDescription from '@helpers/parseModelDescription'

import ModelOptions from '../ModelOptions'
import BusySignal from '@components/BusySignal'
import NegativeOrPositiveButton from '@components/NegativeOrPositiveButton'

import { addModel, selectModel } from '@actions/actions'
import { bindActionCreators } from 'redux'

import update from 'immutability-helper'

class ModelLoader extends Component {
  constructor (props) {
    super(props)

    this.cancelModelLoad = this.cancelModelLoad.bind(this)

    this.zipUploaded = this.zipUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.handleModelOptionsOnChange = this.handleModelOptionsOnChange.bind(this)
    this.addModel = this.addModel.bind(this)

    this.initialState = {
      modelDescription: null,
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
    var modelDescription = parseModelDescription(modelfiles['modelDescription'])

    Object.assign({}, this.props.defaultModelOptions)

    const name = modelfiles.name
    const modelOptions = update(this.props.defaultModelOptions, {name: {$set: name}})

    this.setState({
      name,
      js: modelfiles.js,
      modelDescription: modelDescription,
      modelOptions
    })
  }

  handleModelOptionsOnChange (options) {
    this.setState({
      modelOptions: options
    })
  }

  addModel () {
    if (this.state.name !== this.state.modelOptions.name) {
      // TODO: implement this
      toast.error('Model renaming is not implemented yet')
    }

    this.props.addModel(
      this.state.modelOptions,
      this.state.js,
      this.state.modelDescription
    )

    this.props.selectModel(this.state.modelOptions.name)

    toast.success(`Model '${this.state.modelOptions.name}' added!`)

    this.cancelModelLoad()
  }

  render () {
    return (
      <Transition visible={this.props.isOpen} animation='slide down' duration={150}>
        <div>

          <DropZone display={this.state.displayDropZone}
            onDropAccepted={this.zipUploaded}
            onDropRejected={this.fileRejected}
            header='Load an FMU'
            description='Upload a .zip from Bodylight.js compiler'
            accept='application/zip, application/x-zip, application/x-zip-compressed, multipart/x-zip, application/zip-compressed'
            imgSrc='/images/wafmi.png'
          />

          <BusySignal isBusy={this.state.pendingExtraction} />
          <ModelInfo
            modelDescription={this.state.modelDescription}
          />

          <Divider hidden />

          <ModelOptions
            name={this.state.name}
            visible={this.state.modelDescription !== null}
            options={this.state.modelOptions}
            onChange={this.handleModelOptionsOnChange}
          />

          <Divider hidden />

          <NegativeOrPositiveButton
            positiveEnabled={this.state.modelDescription !== null}
            positiveLabel="Add model"
            positiveOnClick={this.addModel}
            negativeOnClick={this.cancelModelLoad}/>
        </div>
      </Transition>
    )
  }
}

function mapStateToProps ({ models, defaultModelOptions }) {
  return { models, defaultModelOptions }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addModel, selectModel }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ModelLoader)
