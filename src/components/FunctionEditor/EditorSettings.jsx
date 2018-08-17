import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Segment, Dropdown } from 'semantic-ui-react'

import { functionEditorConfigChange } from '@actions'
import { getFunctionEditorConfig } from '@reducers'

class EditorSettings extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (e, {name, value}) {
    this.props.functionEditorConfigChange(name, value)
  }

  renderTheme (theme) {
    const options = [
      { key: 'ambiance', text: 'ambiance', value: 'ambiance' },
      { key: 'chaos', text: 'chaos', value: 'chaos' },
      { key: 'chrome', text: 'chrome', value: 'chrome' },
      { key: 'clouds', text: 'clouds', value: 'clouds' },
      { key: 'clouds_midnight', text: 'clouds_midnight', value: 'clouds_midnight' },
      { key: 'cobalt', text: 'cobalt', value: 'cobalt' },
      { key: 'crimson_editor', text: 'crimson_editor', value: 'crimson_editor' },
      { key: 'dawn', text: 'dawn', value: 'dawn' },
      { key: 'dracula', text: 'dracula', value: 'dracula' },
      { key: 'dreamweaver', text: 'dreamweaver', value: 'dreamweaver' },
      { key: 'eclipse', text: 'eclipse', value: 'eclipse' },
      { key: 'github', text: 'github', value: 'github' },
      { key: 'gob', text: 'gob', value: 'gob' },
      { key: 'gruvbox', text: 'gruvbox', value: 'gruvbox' },
      { key: 'idle_fingers', text: 'idle_fingers', value: 'idle_fingers' },
      { key: 'iplastic', text: 'iplastic', value: 'iplastic' },
      { key: 'katzenmilch', text: 'katzenmilch', value: 'katzenmilch' },
      { key: 'kr_theme', text: 'kr_theme', value: 'kr_theme' },
      { key: 'kuroir', text: 'kuroir', value: 'kuroir' },
      { key: 'merbivore', text: 'merbivore', value: 'merbivore' },
      { key: 'merbivore_soft', text: 'merbivore_soft', value: 'merbivore_soft' },
      { key: 'mono_industrial', text: 'mono_industrial', value: 'mono_industrial' },
      { key: 'monokai', text: 'monokai', value: 'monokai' },
      { key: 'pastel_on_dark', text: 'pastel_on_dark', value: 'pastel_on_dark' },
      { key: 'solarized_dark', text: 'solarized_dark', value: 'solarized_dark' },
      { key: 'solarized_light', text: 'solarized_light', value: 'solarized_light' },
      { key: 'sqlserver', text: 'sqlserver', value: 'sqlserver' },
      { key: 'terminal', text: 'terminal', value: 'terminal' },
      { key: 'textmate', text: 'textmate', value: 'textmate' },
      { key: 'tomorrow', text: 'tomorrow', value: 'tomorrow' },
      { key: 'tomorrow_night', text: 'tomorrow_night', value: 'tomorrow_night' },
      { key: 'tomorrow_night_blue', text: 'tomorrow_night_blue', value: 'tomorrow_night_blue' },
      { key: 'tomorrow_night_bright', text: 'tomorrow_night_bright', value: 'tomorrow_night_bright' },
      { key: 'tomorrow_night_eighties', text: 'tomorrow_night_eighties', value: 'tomorrow_night_eighties' },
      { key: 'twilight', text: 'twilight', value: 'twilight' },
      { key: 'vibrant_ink', text: 'vibrant_ink', value: 'vibrant_ink' },
      { key: 'xcode', text: 'xcode', value: 'xcode' }
    ]
    return <div style={{display: 'inline'}}>
      <label>Lines: </label>
      <Dropdown inline
        name='theme'
        value={theme}
        options={options}
        onChange={this.onChange}
      />
    </div>
  }

  renderHeigth (height) {
    const options = [
      { key: '1em', text: '1 lines', value: '1em' },
      { key: '2em', text: '2 lines', value: '2em' },
      { key: '3em', text: '3 lines', value: '3em' },
      { key: '4em', text: '4 lines', value: '4em' },
      { key: '5em', text: '5 lines', value: '5em' },
      { key: '6em', text: '6 lines', value: '6em' },
      { key: '7em', text: '7 lines', value: '7em' },
      { key: '8em', text: '8 lines', value: '8em' },
      { key: '9em', text: '9 lines', value: '9em' },
      { key: '10em', text: '10 lines', value: '10em' },
      { key: '12em', text: '12 lines', value: '12em' },
      { key: '15em', text: '15 lines', value: '15em' },
      { key: '20em', text: '20 lines', value: '20em' }
    ]
    return <div style={{display: 'inline'}}>
      <label>Lines: </label>
      <Dropdown inline
        name='height'
        value={height}
        options={options}
        onChange={this.onChange}
      />
    </div>
  }

  renderFontSize (fontSize) {
    const options = [
      { key: '0.5em', text: '0.5em', value: '0.5em' },
      { key: '0.6em', text: '0.6em', value: '0.6em' },
      { key: '0.7em', text: '0.7em', value: '0.8em' },
      { key: '0.8em', text: '0.8em', value: '0.7em' },
      { key: '0.9em', text: '0.9em', value: '0.9em' },
      { key: '1em', text: '1em', value: '1em' },
      { key: '1.1em', text: '1.1em', value: '1.1em' },
      { key: '1.2em', text: '1.2em', value: '1.2em' },
      { key: '1.3em', text: '1.3em', value: '1.3em' },
      { key: '1.4em', text: '1.4em', value: '1.4em' },
      { key: '1.5em', text: '1.5em', value: '1.5em' }
    ]
    return <div style={{display: 'inline'}}>
      <label>Font: </label>
      <Dropdown simple item inline
        name='fontSize'
        value={fontSize}
        options={options}
        onChange={this.onChange}
      />
    </div>
  }

  renderKeyboardHandler (keyboardHandler) {
    const options = [
      { key: 'default', text: 'default', value: 'default' },
      { key: 'vim', text: 'vim', value: 'vim' },
      { key: 'emacs', text: 'emacs', value: 'emacs' }
    ]
    return <div style={{display: 'inline'}}>
      <label>Bindings: </label>
      <Dropdown simple item inline
        name='keyboardHandler'
        value={keyboardHandler}
        options={options}
        onChange={this.onChange}
      />
    </div>
  }

  render () {
    const config = this.props.config
    return (
      <Segment basic style={{ borderTop: '1px solid rgba(34, 36, 38, 0.15)' }}>
        {this.renderKeyboardHandler(config.keyboardHandler)}
        {this.renderFontSize(config.fontSize)}
        {this.renderHeigth(config.height)}
        {this.renderTheme(config.theme)}
      </Segment>
    )
  }
}

export default connect(
  state => ({
    config: getFunctionEditorConfig(state)
  }),
  dispatch => bindActionCreators({
    functionEditorConfigChange
  }, dispatch)
)(EditorSettings)
