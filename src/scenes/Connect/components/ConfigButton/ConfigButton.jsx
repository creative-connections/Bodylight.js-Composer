import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import { Checkbox, Rail, Form, Dropdown, Header, Grid, Button, Divider, Transition, Segment } from 'semantic-ui-react'

import ValueProviderDropdown from '@components/ValueProviderDropdown'
import ValueProviders from '@helpers/ValueProviders'
import FunctionEditor from '@components/FunctionEditor'

import update from 'immutability-helper'
import InputFloat from '@components/InputFloat'

import { getConfigForButton, getDefaultConfigForButton } from '@reducers'

import { configButtonRemove, configButtonUpdate, renameButton, removeButton } from '@actions/actions'

class ConfigButton extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return null
  }
}

export default connect(
  state => ({
    config: getConfigForButton(state),
    defaultConfig: getDefaultConfigForButton(),
    getAvailableButtonName: root => getAvailableButtonName(state, root)
  }),
  dispatch => bindActionCreators({
    configButtonRemove,
    configButtonUpdate,
    renameButton,
    removeButton
  }, dispatch)
)(ConfigButton)
