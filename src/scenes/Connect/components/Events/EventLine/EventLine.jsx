import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getActions } from '@reducers'

import Events from './Events'
import Actions from './Actions'
import Args from './Args'

class EventLine extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e, {name, value}) {
    this.props.onChange(e, {
      id: this.props.id,
      key: name,
      value
    })
  }

  render () {
    return <div style={{display: 'inline'}}>
      <label>{'On '}</label>
      <Events
        events={this.props.config.events}
        event={this.props.event}
        onChange={this.onChange}
      />

      <label>{'trigger action'}</label>
      <Actions
        actions={this.props.actions}
        action={this.props.action}
        onChange={this.onChange}
      />

      <Args
        actions={this.props.actions}
        action={this.props.action}
        args={this.props.args}
        onChange={this.onChange}
      />
    </div>
  }
}

export default connect(
  state => ({
    actions: getActions(state)
  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(EventLine)
