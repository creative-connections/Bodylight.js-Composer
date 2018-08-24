import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import WidgetType from '@helpers/enum/WidgetType'
import { getSelectedWidget } from '@reducers'

import ConfigModel from './ConfigModel'
import ConfigAnimate from './ConfigAnimate'
import ConfigAnimateAnim from './ConfigAnimateAnim'
import ConfigAnimateText from './ConfigAnimateText'
import ConfigRange from './ConfigRange'
import ConfigButton from './ConfigButton'

class WidgetSettings extends Component {
  render () {
    const selectedWidget = this.props.selectedWidget
    if (selectedWidget !== null) {
      switch (selectedWidget.type) {
        case WidgetType.MODEL:
          return <ConfigModel model={selectedWidget} />
        case WidgetType.ANIMATE:
          return <ConfigAnimate animate={selectedWidget} />
        case WidgetType.ANIMATE_ANIM:
          return <ConfigAnimateAnim anim={selectedWidget} />
        case WidgetType.ANIMATE_TEXT:
          return <ConfigAnimateText text={selectedWidget} />
        case WidgetType.RANGE:
          return <ConfigRange range={selectedWidget} />
        case WidgetType.BUTTON:
          return <ConfigButton button={selectedWidget} />
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
