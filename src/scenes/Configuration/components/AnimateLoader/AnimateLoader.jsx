import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import AnimatePlayer from '@components/AnimatePlayer'
import NegativeOrPositiveButton from '@components/NegativeOrPositiveButton'

import BusySignal from '@components/BusySignal'
import SimpleList from '@components/SimpleList'
import DropZone from '@components/DropZone'

import AnimateOptions from '../AnimateOptions'

import Runtime from '@helpers/Animate/Runtime'
import preprocess from '@helpers/Animate/preprocess'
import AnimateError from '@exceptions/AnimateError'

import { addAnimate, selectAnimate } from '@actions/actions'

import { Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

class AnimateLoader extends Component {
  constructor (props) {
    super(props)

    this.fileUploaded = this.fileUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.renderInfo = this.renderInfo.bind(this)
    this.handleOptionsChange = this.handleOptionsChange.bind(this)

    this.initialState = {
      displayDropZone: true,
      source: null,
      rootComponent: null,
      components: null,
      pending: false,
      options: null,
      positiveEnabled: false
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
        var rootComponent = file.name.replace(/\.[^/.]+$/, '')
        var source = preprocessed
        Runtime.getComponentNames(source, rootComponent).then(components => {
          this.setState({
            displayDropZone: false,
            source,
            rootComponent,
            pending: false,
            positiveEnabled: true,
            options: {
              name: rootComponent,
              components
            }
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

  onAdd () {
    if (this.state.rootComponent !== this.state.options.name) {
      // TODO: implement this
      toast.error('Animate renaming is not implemented yet')
    }

    this.props.addAnimate(this.state.source, this.state.options)
    this.props.selectAnimate(this.state.options.name)

    toast.success(`Animate '${this.state.options.name}' added!`)

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

  handleOptionsChange (options) {
    this.setState({
      options
    })
  }

  renderInfo () {
    if (this.state.source !== null) {
      return <Grid>
        <Grid.Row stretched>
          <Grid.Column>
            <AnimatePlayer source={this.state.source} name={this.state.rootComponent} width={200} height={200}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3} verticalAlign='top' >
          <Grid.Column>
            <AnimateOptions
              onChange={this.handleOptionsChange}
              options={this.state.options}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">Animations</Header>
            <Segment style={{overflow: 'auto', maxHeight: 20 + 'em'}}>
              <SimpleList data={this.state.options.components['anim']} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">Labels</Header>
            <Segment style={{overflow: 'auto', maxHeight: 20 + 'em'}}>
              <SimpleList data={this.state.options.components['text']} />
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

          <BusySignal busy={this.state.pending}/>

          <DropZone display={this.state.displayDropZone}
            onDropAccepted={this.fileUploaded}
            onDropRejected={this.fileRejected}
            header='Load an Animate CC component'
            description='Upload a HTML5 Canvas .js from Animate CC'
            accept='application/javascript, text/javascript'
            imgSrc='/images/an.png'
          />

          {this.renderInfo()}

          <Divider/>

          <NegativeOrPositiveButton
            positiveEnabled={this.state.positiveEnabled}
            positiveLabel="Add"
            positiveOnClick={this.onAdd}
            negativeLabel="Cancel"
            negativeOnClick={this.onCancel}/>
        </div>
      </Transition>
    )
  }
}

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addAnimate, selectAnimate }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AnimateLoader)
