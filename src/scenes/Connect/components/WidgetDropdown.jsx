import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Dropdown, Header, Grid, Divider, Transition, Segment } from 'semantic-ui-react'
import Widgets from '@helpers/Widgets'

import { selectWidget } from '@actions/actions'

class WidgetDropdown extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (e, {value}) {
    this.props.selectWidget(value)
  }

  render () {
    const widgets = new Widgets()
    var options = widgets.getForDropdown()

    return <Dropdown fluid search selection
      placeholder='Select object'
      options={options}
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
export default connect(mapStateToProps, mapDispatchToProps)(WidgetDropdown)
