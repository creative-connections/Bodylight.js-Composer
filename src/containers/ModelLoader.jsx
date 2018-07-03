import React, {Component} from 'react'
import { connect } from 'react-redux'

import Modal from 'react-modal'
import Dropzone from 'react-dropzone'

import HandlesModelZip from '../helpers/HandlesModelZip'

class ModelLoader extends Component {
  constructor (props) {
    super(props)

    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.cancelModelLoad = this.cancelModelLoad.bind(this)
    this.zipUploaded = this.zipUploaded.bind(this)

    this.initialState = {
      file: null,
      displayDropZone: true
    }

    this.state = this.initialState
  }

  afterOpenModal () {
  }

  cancelModelLoad () {
    this.setState(this.initialState)
    this.props.closeCB()
  }

  zipUploaded (files) {
    const file = files[0]
    console.log('file uploaded')
    console.log(file)
    this.setState({
      file: file,
      displayDropZone: false
    })

    var handlesModelZip = new HandlesModelZip()

    handlesModelZip.unzip(file).then((vals) => {
      console.log('success')
      console.log(vals)
    }).catch((err) => {
      console.error('failure')
      console.error(err)
    })
  }

  renderDropzone () {
    if (this.state.displayDropZone) {
      return <Dropzone
        accept="application/zip, application/x-zip, application/x-zip-compressed, multipart/x-zip, application/zip-compressed"
        multiple={false}
        onDropAccepted={this.zipUploaded}
        onDropRejected={
          (rejected) => {
            console.warn('FIXME: rejected file notify')
            console.warn(rejected)
          }
        } >
        <p>*.zip files will be accepted</p>
      </Dropzone>
    }
    return <div></div>
  }

  renderFileInfo () {
    console.log(this.state.file)
    if (this.state.file !== null) {
      return (
        <div>
          <h2>Submitted files</h2>
          <ul>
            <li>{this.state.file.name} - {this.state.file.size} bytes</li>
          </ul>
        </div>
      )
    }
  }

  render () {
    Modal.setAppElement('#app')

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >

          <h2>Load a model</h2>

          <button onClick={this.cancelModelLoad}>cancel</button>

          <section>
            {this.renderDropzone()}
            {this.renderFileInfo()}
          </section>

        </Modal>
      </div>
    )
  }
}

function mapStateToProps ({ models }) {
  return { models }
}
export default connect(mapStateToProps)(ModelLoader)
