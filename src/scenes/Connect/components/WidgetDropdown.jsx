import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Dropdown, Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'

import { selectWidget } from '@actions/actions'

import { getWidgetsForDropdown } from '@reducers'

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
      value={this.props.selectedWidget}
      onChange={this.onChange}
    />
  }
}

function mapStateToProps ({selectedWidget}) {
  return { selectedWidget }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({selectWidget}, dispatch)
}

export default connect(
  state => ({
    selectedWidget: state.selectedWidget,
    widgets: getWidgetsForDropdown(state)
  }),

  dispatch => bindActionCreators({
    selectWidget
  }, dispatch)

)(WidgetDropdown)
