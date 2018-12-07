import React, { Component } from 'react'

import { Segment, Icon, Button, Transition } from 'semantic-ui-react'

import ButtonLink from '@components/ButtonLink'

import Editor from './Editor'
import EditorMenu from './EditorMenu'
import EditorSettings from './EditorSettings'

import uuid from 'uuid/v1'
import Validator from './Validator'

import Modal from 'react-modal'

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}


class FunctionEditor extends Component {
  constructor(props) {
    super(props)
    Modal.setAppElement('#app')

    this.state = {
      key: this.generateKey(),
      displaySettings: false,
      displayEditor: false,

      validation: {
        error: false,
        message: null,
        parsed: this.props.value
      }
    }

    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleDisplayEditor = this.handleDisplayEditor.bind(this)
  }

  generateKey() {
    return `${this.props.name}-${uuid()}`
  }

  toggleSettings() {
    this.setState({
      displaySettings: !this.state.displaySettings
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      if (this.state.validation !== nextState.validation) {
        // not necessary to update when validation.message did not change
        if (this.state.validation.message === nextState.validation.message) {
          return false
        }
      }
    }
    return true
  }

  handleEditorChange(e, { value }) {
    const result = Validator.validate(value, this.props.typeof)
    this.setState({
      validation: result
    })
  }

  handleDisplayEditor() {
    this.setState({
      displayEditor: true
    })
  }

  handleSave() {
    this.props.onChange(null, {
      name: this.props.name,
      value: this.state.validation.parsed
    })
    this.setState({
      displayEditor: false
    })
  }

  handleCancel() {
    this.setState({
      displayEditor: false
    })
  }

  render() {
    if (this.state.displayEditor === true) {
      return (

        <Modal isOpen={this.state.displayEditor} onRequestClose={this.handleCancel} style={modalStyle} >

        <div style={{width: '100%', ...this.props.style}}>
          <Transition transitionOnMount={true} animation='fade' duration={200} visible={true}>
            <Segment style={{
              padding: '0',
              marginTop: '1em',
              marginBottom: '1em',
              width: '50vw',
            }}>

              <Editor
                key={this.state.key}
                name={this.props.key}
                value={this.props.value}
                onChange={this.handleEditorChange}
              />

              <EditorMenu
                onSettingsClick={this.toggleSettings}
                onSave={this.handleSave}
                onCancel={this.handleCancel}
                displaySettings={this.state.displaySettings}
                validation={this.state.validation}
              />

              <Transition animation='fade' duration={200} visible={this.state.displaySettings}>
                <div>
                  <EditorSettings/>
                </div>
              </Transition>
            </Segment>
          </Transition>
        </div>
      </Modal>
      )
    }

    let preview = ''
    if (this.props.value !== undefined && this.props.value !== null) {
      preview = this.props.value.replace(/\s+/g, ' ')
      const cutoff = 30
      if (preview.length > cutoff) {
        preview = `${preview.substring(0, cutoff)}...`
      }
    }

    return (
      <div style={this.props.style}>
        <Button icon labelPosition='left' onClick={this.handleDisplayEditor}>
          <Icon name='code'/>{preview}
        </Button>
      </div>
    )
  }
}

export default FunctionEditor