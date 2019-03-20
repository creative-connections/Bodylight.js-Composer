import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Menu } from 'semantic-ui-react'

import WidgetType from '@enum/WidgetType'
import { getSelectedWidget } from '@reducers'

import ConfigModel from './widget/ConfigModel'
import ConfigAnimate from './widget/ConfigAnimate'
import ConfigAnimateAnim from './widget/ConfigAnimateAnim'
import ConfigAnimateText from './widget/ConfigAnimateText'
import ConfigRange from './widget/ConfigRange'
import ConfigButton from './widget/ConfigButton'
import ConfigToggle from './widget/ConfigToggle'
import ConfigAction from './widget/ConfigAction'
import ConfigChart from './widget/ConfigChart'
import ConfigLabel from './widget/ConfigLabel'

class Connect extends Component {
  renderSelectedWidget(selectedWidget) {
    if (selectedWidget !== null) {
      switch (selectedWidget.type) {
      case WidgetType.MODEL:
        return <ConfigModel model={selectedWidget} />
      case WidgetType.ANIMATE:
        return <ConfigAnimate widget={selectedWidget} />
      case WidgetType.ANIMATE_ANIM:
        return <ConfigAnimateAnim anim={selectedWidget} />
      case WidgetType.ANIMATE_TEXT:
        return <ConfigAnimateText text={selectedWidget} />
      case WidgetType.RANGE:
        return <ConfigRange range={selectedWidget} />
      case WidgetType.BUTTON:
        return <ConfigButton button={selectedWidget} />
      case WidgetType.TOGGLE:
        return <ConfigToggle toggle={selectedWidget} />
      case WidgetType.CHART:
        return <ConfigChart chart={selectedWidget} />
      case WidgetType.LABEL:
        return <ConfigLabel label={selectedWidget} />
      case WidgetType.ACTION:
        return <ConfigAction action={selectedWidget} />
      }
    }
    return null
  }

  render() {
    const selectedWidget = this.props.selectedWidget

    return <Fragment>
      <div className="connect-sidebar">
        {this.renderSelectedWidget(selectedWidget)}
      </div>
    </Fragment>
  }
}

export default connect(
  state => ({
    selectedWidget: getSelectedWidget(state)
  }),
  dispatch => bindActionCreators({}, dispatch)
)(Connect)
