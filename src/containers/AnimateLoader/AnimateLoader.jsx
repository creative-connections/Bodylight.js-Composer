import React, { Component } from 'react'

import AnimatePlayer from '@components/AnimatePlayer'
import Runtime from '@helpers/Animate/Runtime'
import NegativeOrPositiveButton from '@components/NegativeOrPositiveButton'
import { Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

import SimpleList from '@components/SimpleList'
import DropZone from '@components/DropZone'
import { toast } from 'react-toastify'

import AnimateError from '@exceptions/AnimateError'

import preprocess from '@helpers/Animate/preprocess'
import BusySignal from '@components/BusySignal'

class AnimateLoader extends Component {
  constructor (props) {
    super(props)

    this.fileUploaded = this.fileUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.renderInfo = this.renderInfo.bind(this)

    this.initialState = {
      displayDropZone: true,
      source: null,
      name: null,
      components: null,
      pending: false
    }

    this.state = this.initialState
    createjs.Ticker.setFPS(60)
  }

  fileRejected (files) {
    const msg = `File '${files[0].name}' does not appear to be a .js`
    toast.error(msg)
  }

  fileUploaded (files) {
    const file = files[0]

    var reader = new FileReader()
    reader.onloadend = () => {
      preprocess(reader.result).then(preprocessed => {
        var name = file.name.replace(/\.[^/.]+$/, '')
        var source = preprocessed
        Runtime.getComponentNames(source, name).then(components => {
          this.setState({
            displayDropZone: false,
            source,
            name,
            components,
            pending: false
          })
        })
      })
    }
    this.setState({pending: true})
    reader.readAsText(file)
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
    } else if (error instanceof TypeError) {
      toast.error(`Could not load submitted js file, error: '${error.message}'.`)
      toast.info('.js file should be exported by Adobe Animate CC (2017, 2018)')
    } else {
      toast.error(error.message)
    }

    this.setState(this.initialState)
  }

  renderInfo () {
    if (this.state.source !== null) {
      return <Grid>
        <Grid.Row stretched>
          <Grid.Column>
            <AnimatePlayer source={this.state.source} name={this.state.name} width={200} height={200}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3} verticalAlign='top' >
          <Grid.Column>
            <Header as="h4">Options</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">Animations</Header>
            <Segment style={{overflow: 'auto', maxHeight: 20 + 'em'}}>
              <SimpleList data={this.state.components['anim']} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">Labels</Header>
            <Segment style={{overflow: 'auto', maxHeight: 20 + 'em'}}>
              <SimpleList data={this.state.components['text']} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
  }

  render () {
    return (
      <Transition visible={this.props.display} animation='slide down' duration={150}>
        <div>

          <BusySignal isBusy={this.state.pending}/>

          <DropZone display={this.state.displayDropZone}
            onDropAccepted={this.fileUploaded}
            onDropRejected={this.fileRejected}
            header='Load an Animate CC component'
            description='Upload a HTML5 Canvas .js from Animate CC'
            accept='application/javascript'
            imgSrc='/images/an.png'
          />

          {this.renderInfo()}

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
