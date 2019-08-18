import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input } from 'semantic-ui-react'
import { updateConfig, renameAction } from '@actions'

import GridRow from '@components/GridRow'
import FunctionEditor from '@components/FunctionEditor'

class ConfigJavascript extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e, { name, value, checked }) {
    if (typeof checked !== 'undefined') {
      value = checked
    }
    this.props.updateConfig(this.props.widget, name, value)
  }

  render() {
    const config = this.props.widget

    return <Fragment>
      <GridRow label='Name'>
        <Input
          name='name'
          value={config.name}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='Javascript'>
        <FunctionEditor
          name='javascript'
          language='javascript'
          value={config.javascript}
          onChange={this.handleOnChange}
          typeof={false}
        />
      </GridRow>
    </Fragment>
  }
}

export default connect(null,
  dispatch => bindActionCreators({
    updateConfig,
    renameAction
  }, dispatch)
)(ConfigJavascript)
