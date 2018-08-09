import React, { Component } from 'react'

import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'

import gjsPresetWebsite from 'grapesjs-preset-webpage'
import gjsBlocksBasic from 'grapesjs-blocks-basic'

import gjsReduxStorage from './storage/redux'

import animateBlock from './blocks/Animate'

class Editor extends Component {
  constructor (props) {
    super(props)

    this.editor = React.createRef()
  }
  componentDidMount () {
    const editor = grapesjs.init({
      container: this.editor.current,

      components: '',
      fromElement: false,

      height: '100vh',
      width: 'auto',

      storageManager: {
        id: '',
        type: 'redux',
        stepsBeforeSave: 1
      },

      plugins: [
        'gjs-redux-storage',
        'gjs-blocks-basic'
      ]
    })

    const cmdCanvasClear = 'canvas-clear'
    editor.Commands.add(cmdCanvasClear,
      e => confirm('This will clear the entire design, continue?') &&
      e.runCommand('core:canvas-clear'))
    editor.Panels.addButton('options', {
      id: cmdCanvasClear,
      className: 'fa fa-trash',
      command: e => e.runCommand(cmdCanvasClear)
    })

    animateBlock(editor)

    editor.Panels.getButton('views', 'open-blocks').set('active', true)
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div ref={this.editor} />
    )
  }
}

export default Editor
