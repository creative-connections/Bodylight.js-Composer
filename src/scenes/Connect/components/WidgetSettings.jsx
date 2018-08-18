import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import WidgetType from '@helpers/WidgetType'
import { getSelectedWidget } from '@reducers'

import ConfigAnimateAnim from './ConfigAnimateAnim'
import ConfigAnimateText from './ConfigAnimateText'
import ConfigRange from './ConfigRange'
import ConfigButton from './ConfigButton'

class WidgetSettings extends Component {
  render () {
    const selectedWidget = this.props.selectedWidget
    if (selectedWidget !== null) {
      switch (selectedWidget.type) {
        case WidgetType.ANIMATE_ANIM:
          return <ConfigAnimateAnim anim={selectedWidget} />
        case WidgetType.ANIMATE_TEXT:
          return <ConfigAnimateText text={selectedWidget} />
        case WidgetType.RANGE:
          return <ConfigRange range={selectedWidget} />
        case WidgetType.BUTTON:
          return <ConfigButton range={selectedWidget} />
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
