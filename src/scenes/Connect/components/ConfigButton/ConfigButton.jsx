import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import { Checkbox, Rail, Form, Dropdown, Header, Grid, Button, Divider, Transition, Segment } from 'semantic-ui-react'

import ValueProviderDropdown from '../ValueProviderDropdown'
import ValueProviders from '@helpers/ValueProviders'
import FunctionEditor from '@components/FunctionEditor'

import update from 'immutability-helper'
import InputFloat from '@components/form/InputFloat'

import { getConfigForRanges, getDefaultConfigForRanges } from '@reducers'

import { configRangeRemove, configRangeUpdate, renameRange, removeRange } from '@actions/actions'

class ConfigButton extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return null
  }
}

export default ConfigButton
