import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Dropdown } from 'semantic-ui-react'

import { selectWidget } from '@actions/actions'
import { getWidgetsForDropdown, getSelectedWidget } from '@reducers'

class WidgetDropdown extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (e, {value}) {
    this.props.selectWidget(value)
  }

  render () {
    return <Dropdown fluid search selection
      placeholder='Select object'
      options={this.props.widgets}
      value={this.props.selectedWidget.id}
      onChange={this.onChange}
    />
  }
}

export default connect(
  state => ({
    selectedWidget: getSelectedWidget(state),
    widgets: getWidgetsForDropdown(state)
  }),

  dispatch => bindActionCreators({
    selectWidget
  }, dispatch)

)(WidgetDropdown)
