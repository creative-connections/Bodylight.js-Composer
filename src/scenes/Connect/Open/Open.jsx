import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import { loadStore } from '@src/configureStore'

import DropZone from '@components/DropZone'
import BusySignal from '@components/BusySignal'

import GridRow from '@components/GridRow'

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
      <GridRow label='Open Project file (.bjp)'>
        <BusySignal busy={this.state.pending} />
        <DropZone display={true}
          className='dropzone'
          onDropAccepted={this.fileUploaded}
          onDropRejected={this.fileRejected}
          description='Project file .bjp'
          accept=''
          imgSrc={``}
        />
      </GridRow>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({}, dispatch)
)(Open)
