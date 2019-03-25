import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Dropdown } from 'semantic-ui-react'
import { configGetLabel, getToggles } from '@reducers'
import { updateConfig, renameLabel } from '@actions/actions'

import ButtonLink from '@components/ButtonLink'

import GridRow from '@components/GridRow'
import ComplexAttribute from '@components/ComplexAttribute'
import Events from '../Events'

class ConfigRange extends Component {
  constructor(props) {
    super(props)

    this.handleOnChange = this.handleOnChange.bind(this)
    this.renameLabel = this.renameLabel.bind(this)
    this.clearFor = this.clearFor.bind(this)
  }

  renameLabel(e, { value }) {
    this.handleOnChange(e, { name: 'label.value', value })
    this.props.renameLabel(this.props.label, value)
  }

  handleOnChange(e, { name, value, checked }) {
    if (typeof checked !== 'undefined') {
      value = checked
    }

    this.props.updateConfig(this.props.label, name, value)
  }

  clearFor() {
    this.handleOnChange(null, { name: 'for', value: null })
  }

  render() {
    const config = this.props.config

    const toggles = []
    Object.entries(this.props.toggles).forEach(([id, toggle]) => {
      toggles.push({ key: id, text: `toggle: ${toggle.name}`, value: id })
    })

    return <Fragment>
      <GridRow label='Name'>
        <Input
          name='name'
          value={this.props.label.name}
          onChange={this.renameLabel}
        />
      </GridRow>
      <GridRow label='Label'>
        <ComplexAttribute
          name='label'
          attribute={config.label}
          onChange={this.handleOnChange}
        />
      </GridRow>

      <GridRow label='Enabled'>
        <ComplexAttribute
          name='enabled'
          label='Label can change'
          attribute={config.enabled}
          onChange={this.handleOnChange}
        />
      </GridRow>

      <GridRow label='Visible'>
        <ComplexAttribute
          name='visible'
          label='Label is visible'
          attribute={config.visible}
          onChange={this.handleOnChange}
        />
      </GridRow>

      <GridRow label='For'>
        <Dropdown
          name='for'
          value={config.for}
          onChange={this.handleOnChange}
          options={toggles}
          placeholder='select target'
        />

        <ButtonLink className={'compact'} onClick={this.clearFor}>x</ButtonLink>
      </GridRow>
      <Events
        widget={this.props.label}
        config={config}
      />
    </Fragment>
  }
}

export default connect(
  (state, props) => ({
    config: configGetLabel(state, props.label.id),
    toggles: getToggles(state)
  }),
  dispatch => bindActionCreators({
    updateConfig,
    renameLabel
  }, dispatch)
)(ConfigRange)