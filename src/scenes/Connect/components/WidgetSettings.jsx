import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import WidgetType from '@helpers/WidgetType'

import { getSelectedWidget } from '@reducers'

import AnimateAnimSettings from './AnimateAnimSettings'
import AnimateTextSettings from './AnimateTextSettings'

class WidgetSettings extends Component {
  render () {
    const selectedWidget = this.props.selectedWidget

    if (selectedWidget !== null) {
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
    }

    return null
  }
}

export default connect(
  state => ({
    selectedWidget: getSelectedWidget(state)
  }),

  dispatch => bindActionCreators({}, dispatch)
)(WidgetSettings)
