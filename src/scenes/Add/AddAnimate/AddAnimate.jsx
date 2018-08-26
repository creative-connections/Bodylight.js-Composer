import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'

import DropZone from '@components/DropZone'
import BusySignal from '@components/BusySignal'

import { addAnimate } from '@actions'

import Runtime from '@runtime/templates/AnimateRuntime'
import preprocess from './preprocess'
import generateHash from '@helpers/generateHash'

import WidgetMenu from '@components/WidgetMenu'

class AddAnimate extends Component {
  constructor (props) {
    super(props)
    this.fileUploaded = this.fileUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.state = {
      pending: false,
      redirect: false
    }
  }

  fileRejected (files) {
    const msg = `File '${files[0].name}' does not appear to be a .js`
    toast.error(msg)
  }

  fileUploaded (files) {
    const file = files[0]

    const reader = new FileReader()
    reader.onloadend = () => {
      preprocess(reader.result).then(preprocessed => {
        const rootComponent = file.name.replace(/\.[^/.]+$/, '')
        const runnable = Runtime.functionalizeSource(preprocessed)
        const js = preprocessed

        Runtime.getComponentNames(runnable, rootComponent).then(components => {
          generateHash(js).then(hash => {
            this.props.addAnimate(js, hash, rootComponent, components)
            this.setState({
              pending: false,
              redirect: true
            })
          })
        }).catch(error => {
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
          this.setState({
            pending: false
          })
        })
      })
    }
    this.setState({pending: true})
    reader.readAsText(file)
  }

  render () {
    return <Fragment>
      <div id='topBar' className='header'>
      </div>
      <Grid padded centered className='leftShadow topPadded'>
        <Grid.Row centered padded='horizontally' className='notPadded'>
          <Grid.Column style={{ marginTop: '2em', width: '85%' }}>
            <BusySignal busy={this.state.pending} />
            {this.state.redirect && <Redirect to="/"/>}
            <DropZone display={true}
              onDropAccepted={this.fileUploaded}
              onDropRejected={this.fileRejected}
              description='HTML5 Canvas .js from Animate CC'
              accept='application/javascript, text/javascript'
              imgSrc='/images/an.png'
            />
          </Grid.Column>
          <Grid.Column id='widget-menu' style={{ width: '15%' }}>
            <WidgetMenu/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({ addAnimate }, dispatch)
)(AddAnimate)
