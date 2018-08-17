import React, { Component } from 'react'
import { connect } from 'react-redux'

import AceEditor from 'react-ace'
import { getFunctionEditorConfig } from '@reducers'

import 'brace/mode/javascript'
import 'brace/keybinding/emacs'
import 'brace/keybinding/vim'

import 'brace/theme/ambiance'
import 'brace/theme/chaos'
import 'brace/theme/chrome'
import 'brace/theme/clouds'
import 'brace/theme/clouds_midnight'
import 'brace/theme/cobalt'
import 'brace/theme/crimson_editor'
import 'brace/theme/dawn'
import 'brace/theme/dracula'
import 'brace/theme/dreamweaver'
import 'brace/theme/eclipse'
import 'brace/theme/github'
import 'brace/theme/gob'
import 'brace/theme/gruvbox'
import 'brace/theme/idle_fingers'
import 'brace/theme/iplastic'
import 'brace/theme/katzenmilch'
import 'brace/theme/kr_theme'
import 'brace/theme/kuroir'
import 'brace/theme/merbivore'
import 'brace/theme/merbivore_soft'
import 'brace/theme/mono_industrial'
import 'brace/theme/monokai'
import 'brace/theme/pastel_on_dark'
import 'brace/theme/solarized_dark'
import 'brace/theme/solarized_light'
import 'brace/theme/sqlserver'
import 'brace/theme/terminal'
import 'brace/theme/textmate'
import 'brace/theme/tomorrow'
import 'brace/theme/tomorrow_night'
import 'brace/theme/tomorrow_night_blue'
import 'brace/theme/tomorrow_night_bright'
import 'brace/theme/tomorrow_night_eighties'
import 'brace/theme/twilight'
import 'brace/theme/vibrant_ink'
import 'brace/theme/xcode'

/**
 * Ace JavaScript editor.
 *
 * This component ignores changes to 'props.value'
 */
class Editor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      buffer: this.props.value
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value, event) {
    // Remember current state, in case of re-render
    this.setState({
      buffer: value
    })

    // Notifty outside context that we have changed
    this.props.onChange(null, {
      name: 'value',
      value: value
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    /*
     * We must have a lock on the variable we are editting, otherwise we might
     * lose our changes on impetus from outside context.
     */
    if (nextProps.value !== this.props.value) {
      return false
    }

    /*
     * Buffer is handled internally by the AceEditor, no need to re-render,
     * we just remember the buffer in case re-render is forced on us from the
     * outside context (e.g. config change)
     */
    if (nextState.buffer !== this.state.buffer) {
      return false
    }

    return true
  }

  render () {
    const config = this.props.functionEditorConfig

    let keyboardHandler = null
    if (config.keyboardHandler !== 'default') {
      keyboardHandler = config.keyboardHandler
    }

    return <AceEditor
      mode={config.mode}
      theme={config.theme}
      keyboardHandler={keyboardHandler}
      fontSize={config.fontSize}
      height={config.height}

      width='100%'

      onChange={this.handleChange}
      name={this.props.name}
      value={this.state.buffer}

      showPrintMargin={false}
      editorProps={{
        $blockScrolling: true
      }}
    />
  }
}

export default connect(
  state => ({
    functionEditorConfig: getFunctionEditorConfig(state)
  })
)(Editor)
