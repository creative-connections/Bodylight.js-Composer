import React, { Component, Fragment } from 'react'
import { Icon } from 'semantic-ui-react'

import WidgetType from '@helpers/enum/WidgetType'

class TreeNode extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: props.collapsed === undefined ? false : props.collapsed
    }

    this.onIconClick = this.onIconClick.bind(this)
    this.getIcon = this.getIcon.bind(this)
  }

  getIcon () {
    if (this.props.type === WidgetType.ANIMATE_TEXT) {
      return 'text cursor'
    }
    if (this.props.type === WidgetType.ANIMATE_ANIM) {
      return 'picture'
    }
    if (this.props.type === WidgetType.RANGE) {
      return 'arrows alternate horizontal'
    }
    if (this.props.type === WidgetType.BUTTON) {
      return 'square'
    }
    if (this.props.type === WidgetType.MODEL) {
      return 'cog'
    }
    if (this.props.type === WidgetType.ACTION) {
      return 'code'
    }
  }

  onIconClick () {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  renderItem () {
    if (this.state.collapsed) {
      return <Fragment>
        <Icon size='small' name="plus square outline" onClick={this.onIconClick}/>
        <Icon name={this.getIcon()}/>
        {this.props.name}
      </Fragment>
    }

    return <Fragment>
      <Icon size='small' name="minus square outline" onClick={this.onIconClick}/>
      <Icon name={this.getIcon()}/>
      {this.props.name}
      <ul>{this.props.children}</ul>
    </Fragment>
  }

  render () {
    let className = ''
    if (this.props.selected !== undefined && this.props.selected !== null &&
      this.props.selected.id === this.props.id &&
      this.props.id !== undefined) {
      className = 'selected'
    }

    if (this.props.collapsable) {
      return (
        <Fragment>
          <li
            className={className}
            onClick={this.props.onClick}
            data-id={this.props.id}
          >
            {this.renderItem()}
          </li>
        </Fragment>
      )
    }
    return (
      <li className={className} onClick={this.props.onClick} data-id={this.props.id}>
        <Icon name={this.getIcon()}/>
        {this.props.name}
      </li>
    )
  }
}

export default TreeNode
