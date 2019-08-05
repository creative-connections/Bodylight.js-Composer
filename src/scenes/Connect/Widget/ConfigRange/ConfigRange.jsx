import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Input } from 'semantic-ui-react'
import { configGetRange } from '@reducers'
import { updateConfig, renameRange, removeRange } from '@actions/actions'

import GridRow from '@components/GridRow'
import ComplexAttribute from '@components/ComplexAttribute'
import Events from '../Events'

class ConfigRange extends Component {
  constructor(props) {
    super(props)

    this.handleRemove = this.handleRemove.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renameRange = this.renameRange.bind(this)
  }

  renameRange(e, { value }) {
    this.props.renameRange(this.props.range, value)
  }

  handleRemove(e, { value }) {
    this.props.removeRange(this.props.range, value)
  }

  handleOnChange(e, { name, value, checked }) {
    if (typeof checked !== 'undefined') {
      value = checked
    }

    this.props.updateConfig(this.props.range, name, value)
  }

  render() {
    const config = this.props.config
    return <Fragment>
      <GridRow label='Name'>
        <Input
          name='name'
          value={this.props.range.name}
          onChange={this.renameRange}
        />
      </GridRow>
      <GridRow label='Target'>
        <ComplexAttribute complex nofunc
          name='target'
          attribute={config.target}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='Maximum'>
        <ComplexAttribute
          name='max'
          attribute={config.max}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='Minimum'>
        <ComplexAttribute
          name='min'
          attribute={config.min}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='Vertical'>
        <ComplexAttribute
          name='vertical'
          label='Range is vertical'
          attribute={config.vertical}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='Enabled'>
        <ComplexAttribute
          name='enabled'
          label='Range responds to user input'
          attribute={config.enabled}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <GridRow label='Reversed'>
        <ComplexAttribute
          name='reversed'
          label='Range output is reversed'
          attribute={config.reversed}
          onChange={this.handleOnChange}
        />
      </GridRow>
      <Events
        widget={this.props.range}
        config={config}
      />
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetRange(state, props.range.id)
  }),
  dispatch => bindActionCreators({
    updateConfig,
    renameRange,
    removeRange
  }, dispatch)
)(ConfigRange)
