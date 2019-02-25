import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Divider, Checkbox, Header, Grid, Transition } from 'semantic-ui-react'

import { updateWidgetConfig } from '@actions'
import { getTicker } from '@reducers'
import GridRow from '../GridRow'

class ConfigModel extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e, { name, value, checked }) {
    if (typeof checked !== 'undefined' && name !== 'mode') {
      value = checked
    }
    this.props.updateWidgetConfig(
      this.props.config.id,
      this.props.config.type, 
      name,
      value
    )
  }

  render() {
    const config = this.props.config
    if (config == null) { return null }
    return <Fragment>
      <GridRow label='Name'>
        <Input
          name='name'
          value={config.name}
          onChange={this.handleOnChange}
        />
      </GridRow>
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: getTicker(state, props.ticker)
  }),
  dispatch => bindActionCreators({updateWidgetConfig}, dispatch)
)(ConfigModel)
