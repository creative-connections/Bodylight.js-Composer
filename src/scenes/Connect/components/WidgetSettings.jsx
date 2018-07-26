import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Widgets from '@helpers/Widgets'
import WidgetTypes from '@helpers/WidgetTypes'

import AnimateAnimSettings from './AnimateAnimSettings'

class WidgetSettings extends Component {
  render () {
    var selectedWidget = Widgets.value(this.props.selectedWidget)

    switch (selectedWidget.type) {
      case WidgetTypes.ANIMATE_ANIM:
        return <AnimateAnimSettings
          name={selectedWidget.name}
          parent={selectedWidget.parent}
        />
    }

    return null
  }
}

function mapStateToProps ({ selectedWidget }) {
  return { selectedWidget }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(WidgetSettings)
