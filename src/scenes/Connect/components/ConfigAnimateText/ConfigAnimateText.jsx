import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Header, Grid, Divider } from 'semantic-ui-react'

import { getDefaultConfigForAnimateText, getConfigForAnimateText } from '@reducers'
import { configAnimateTextUpdate, configAnimateTextRemove } from '@actions/actions'

import GridRow from '../GridRow'
import ComplexAttribute from '../ComplexAttribute'

class ConfigAnimateText extends Component {
  constructor (props) {
    super(props)

    this.getConfig = this.getConfig.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  getConfig () {
    if (this.props.config[this.props.text.parent] === undefined ||
       this.props.config[this.props.text.parent][this.props.text.name] === undefined) {
      return this.props.defaultConfig
    }
    return this.props.config[this.props.text.parent][this.props.text.name]
  }

  handleOnChange (e, {name, value, checked}) {
    if (typeof checked !== 'undefined') {
      value = checked
    }
    this.props.configAnimateTextUpdate(this.props.text, name, value)
  }

  render () {
    const config = this.getConfig()
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
  state => ({
    config: getConfigForAnimateText(state),
    defaultConfig: getDefaultConfigForAnimateText()
  }),
  dispatch => bindActionCreators({
    configAnimateTextRemove,
    configAnimateTextUpdate
  }, dispatch)
)(ConfigAnimateText)
