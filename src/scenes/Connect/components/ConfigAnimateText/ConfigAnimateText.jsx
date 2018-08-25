import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Header, Grid, Divider } from 'semantic-ui-react'

import { configGetAnimateText } from '@reducers'
import { updateConfig } from '@actions/actions'

import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'

class ConfigAnimateText extends Component {
  constructor (props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined') {
      value = checked
    }
    this.props.updateConfig(this.props.text, name, value)
  }

  render () {
    const config = this.props.config
    return (
      <div>
        <Header as="h2">AnimateText: {this.props.text.name}</Header>

        <Grid verticalAlign='middle' celled='internally'>
          <GridRow label='Value:'>
            <ComplexAttribute
              name='value'
              attribute={config.value}
              onChange={this.handleOnChange}
            />
          </GridRow>
        </Grid>

        <br></br>

        <Grid verticalAlign='middle' celled='internally'>
          <GridRow label='visible:'>
            <ComplexAttribute
              label="Display the text"
              name='visible'
              attribute={config.visible}
              onChange={this.handleOnChange}
            />
          </GridRow>
        </Grid>
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    config: configGetAnimateText(state, props.text.id)
  }),
  dispatch => bindActionCreators({
    updateConfig
  }, dispatch)
)(ConfigAnimateText)
