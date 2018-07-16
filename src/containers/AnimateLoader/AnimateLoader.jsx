import React, { Component } from 'react'

import AnimatePlayer from '@components/AnimatePlayer'
import NegativeOrPositiveButton from '@components/NegativeOrPositiveButton'
import { Card, Divider, Transition } from 'semantic-ui-react'

import DropZone from '@components/DropZone'
import { toast } from 'react-toastify'

import AnimateError from '@exceptions/AnimateError'

class AnimateLoader extends Component {
  constructor (props) {
    super(props)

    this.fileUploaded = this.fileUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.renderAnimatePlayer = this.renderAnimatePlayer.bind(this)

    this.initialState = {
      displayDropZone: true,
      sourceLoaded: false,
      source: null,
      name: ''
    }

    this.state = this.initialState
  }

  fileRejected (files) {
    const msg = `File '${files[0].name}' does not appear to be a .js`
    toast.error(msg)
  }

  fileUploaded (files) {
    const file = files[0]

    var reader = new FileReader()

    reader.onloadend = () => {
      this.setState({
        displayDropZone: false,
        sourceLoaded: true,
        source: reader.result,
        name: file.name.replace(/\.[^/.]+$/, '')
      })
    }
    reader.readAsBinaryString(file)
  }

  onCancel () {
    this.setState(this.initialState)
    this.props.onClose()
  }

  componentDidCatch (error, info) {
    if (error instanceof AnimateError) {
      const msg = `Error while initializing animate component: ${error.message}.`
      toast.error(msg)
      toast.info('Name of the js file must correspond to the name of the topmost component')
    } else {
      toast.error(error.message)
    }

    this.setState(this.initialState)
  }

  renderAnimatePlayer () {
    if (!this.state.sourceLoaded) {
      return null
    }
    return (
      <AnimatePlayer source={this.state.source} name={this.state.name} width={200} height={200}/>
    )
  }

  render () {
    return (
      <Transition visible={this.props.display} animation='slide down' duration={150}>
        <div>

          <DropZone display={this.state.displayDropZone}
            onDropAccepted={this.fileUploaded}
            onDropRejected={this.fileRejected}
            header='Load an Animate CC component'
            description='Upload a HTML5 Canvas .js from Animate CC'
            accept='application/javascript'
          />

          {this.renderAnimatePlayer()}

          <Divider/>

          <NegativeOrPositiveButton
            positiveEnabled={false}
            negativeLabel="close"
            negativeOnClick={this.onCancel}/>
        </div>
      </Transition>
    )
  }
}

export default AnimateLoader
