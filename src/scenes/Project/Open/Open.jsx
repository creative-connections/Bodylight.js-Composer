import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { Redirect, withRouter } from 'react-router-dom'
import { Grid, Menu } from 'semantic-ui-react'

import { loadStore } from '@src/configureStore'

import DropZone from '@components/DropZone'
import BusySignal from '@components/BusySignal'

class Open extends Component {
  constructor(props) {
    super(props)
    this.fileUploaded = this.fileUploaded.bind(this)
    this.fileRejected = this.fileRejected.bind(this)
    this.state = {
      pending: false,
    }
  }

  fileRejected(files) {
    // accepting all files
    toast.error(`Could not handle file upload, unknown error`)
    console.log('Error files', files)
  }

  fileUploaded(files) {
    const file = files[0]

    const reader = new FileReader()
    reader.onloadend = () => {
      loadStore(reader.result).then(() => {
        // App is dead now, waiting for GC. Long live the App!
        this.props.history.push(`${process.env.PATH}/`)
      }).catch((err) => {
        toast.error(`Could not load file: ${err.message}`)
        this.setState({ pending: false })
      })
    }
    this.setState({ pending: true })
    reader.readAsText(file)
  }

  render() {
    return <Fragment>
      <div id='topBar' className='header'>
      </div>
      <Grid padded centered className='leftShadow topPadded'>
        <Grid.Row centered padded='horizontally' className='notPadded'>
          <Grid.Column style={{ marginTop: '2em', width: '85%' }}>
            <BusySignal busy={this.state.pending} />
            <DropZone display={true}
              className='dropzone'
              onDropAccepted={this.fileUploaded}
              onDropRejected={this.fileRejected}
              description='Project file .bjp'
              accept=''
              imgSrc={``}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({}, dispatch)
)(withRouter(Open))