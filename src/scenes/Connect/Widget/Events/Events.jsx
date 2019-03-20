import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Input, Checkbox, Header, Grid, Divider, Transition } from 'semantic-ui-react'

import GridRow from '@components/GridRow'
import ButtonLink from '@components/ButtonLink'
import EventLine from './EventLine'

import { widgetActionAdd, widgetActionRemove, widgetActionUpdate } from '@actions'

class Events extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  add () {
    this.props.widgetActionAdd(this.props.widget)
  }

  remove (e, {name}) {
    this.props.widgetActionRemove(this.props.widget, name)
  }

  onChange (e, {id, key, value}) {
    this.props.widgetActionUpdate(this.props.widget, id, key, value)
  }

  renderEvent (action) {
    return (
      <GridRow compact={true} key={action.id}>
        <EventLine
          widget={this.props.widget}
          config={this.props.config}
          id={action.id}
          event={action.event}
          action={action.action}
          args={action.args}
          onChange={this.onChange}
        />
        <ButtonLink
          name={action.id}
          className={'compact'}
          onClick={this.remove}>X</ButtonLink>
      </GridRow>
    )
  }

  renderEvents () {
    const actions = this.props.config.actions
    const events = []
    Object.entries(actions).forEach(([id, action]) => {
      events.push(this.renderEvent(action))
    })
    return events
  }

  renderAddEvent () {
    return <GridRow compact={true}>
      <ButtonLink onClick={this.add}>Add event</ButtonLink>
    </GridRow>
  }

  render () {
    return <Fragment>
      <GridRow label='Events'>
        {this.renderEvents()}
        {this.renderAddEvent()}
      </GridRow>
    </Fragment>
  }
}

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({
    widgetActionAdd,
    widgetActionRemove,
    widgetActionUpdate
  }, dispatch)
)(Events)
