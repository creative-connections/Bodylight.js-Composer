import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Menu } from 'semantic-ui-react'

import WidgetType from '@helpers/enum/WidgetType'
import { getSelectedWidget } from '@reducers'

import ConfigModel from './ConfigModel'
import ConfigAnimate from './ConfigAnimate'
import ConfigAnimateAnim from './ConfigAnimateAnim'
import ConfigAnimateText from './ConfigAnimateText'
import ConfigRange from './ConfigRange'
import ConfigButton from './ConfigButton'
import ConfigAction from './ConfigAction'

import WidgetMenu from './WidgetMenu'

class WidgetSettings extends Component {
  renderSelectedWidget (selectedWidget) {
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
        case WidgetType.ACTION:
          return <ConfigAction action={selectedWidget} />
      }
    }
    return null
  }

  render () {
    const selectedWidget = this.props.selectedWidget

    return <Fragment>
      <div id='topBar' className='header'>
        <span>{selectedWidget && selectedWidget.name}</span>
      </div>
      <Grid padded centered className='leftShadow topPadded'>
        <Grid.Row centered style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Grid.Column style={{ marginTop: '2em', width: '85%' }}>
            {this.renderSelectedWidget(selectedWidget)}
          </Grid.Column>
          <Grid.Column id='widget-menu' style={{ width: '15%' }}>
            <WidgetMenu/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  }
}

export default connect(
  state => ({
    selectedWidget: getSelectedWidget(state)
  }),
  dispatch => bindActionCreators({}, dispatch)
)(WidgetSettings)
