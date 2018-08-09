import React, { Component } from 'react'

import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'

import gjsPresetWebsite from 'grapesjs-preset-webpage'
import gjsReduxStorage from './storage/redux'

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
        type: 'redux',
        stepsBeforeSave: 1
      },

      plugins: ['gjs-redux-storage']
    })
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
