import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Widgets from '@helpers/Widgets'
import WidgetType from '@helpers/WidgetType'

import AnimateAnimSettings from './AnimateAnimSettings'
import AnimateTextSettings from './AnimateTextSettings'

class WidgetSettings extends Component {
  render () {
    var selectedWidget = Widgets.value(this.props.selectedWidget)

    switch (selectedWidget.type) {
      case WidgetType.ANIMATE_ANIM:
        return <AnimateAnimSettings
          key={selectedWidget.name + selectedWidget.parent}
          name={selectedWidget.name}
          parent={selectedWidget.parent}
        />
      case WidgetType.ANIMATE_TEXT:
        return <AnimateTextSettings
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
