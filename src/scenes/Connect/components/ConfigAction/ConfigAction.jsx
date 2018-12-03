import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Input } from 'semantic-ui-react'
import { configGetAction } from '@reducers'
import { updateConfig, renameAction } from '@actions'

import GridRow from '../GridRow'
import FunctionEditor from '@components/FunctionEditor'
import Args from './Args'

class ConfigAction extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.rename = this.rename.bind(this)
  }

  handleOnChange(e, { name, value, checked }) {
    if (typeof checked !== 'undefined') {
      value = checked
    }
    this.props.updateConfig(this.props.action, name, value)
  }

  rename(e, { value }) {
    this.handleOnChange(e, { name: 'label', value })
    this.props.renameAction(this.props.action, value)
  }

  render() {
    const config = this.props.config

    return <Fragment>
      <GridRow label='Name:'>
        <Input
          name='name'
          value={config.name}
          onChange={this.rename}
        />
      </GridRow>
      <GridRow label='Label:'>
        <Input
          name='label'
          value={config.label}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='Description:'>
        <Input
          name='description'
          value={config.description}
          onChange={this.handleOnChange}
          style={{width: '40em'}}
        />
      </GridRow>
      <GridRow label='Arguments:'>
        <Args
          name='args'
          args={config.args}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='Function:'>
        <FunctionEditor
          name={'function'}
          value={config.function}
          onChange={this.handleOnChange}
          typeof={false}
        />
      </GridRow>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetAction(state, props.action.id)
  }),
  dispatch => bindActionCreators({
    updateConfig,
    renameAction
  }, dispatch)
)(ConfigAction)