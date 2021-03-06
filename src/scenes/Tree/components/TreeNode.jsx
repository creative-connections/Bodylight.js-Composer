import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

import WidgetType from '@enum/WidgetType'

class TreeNode extends Component {
  constructor(props) {
    super(props)

    let collapsed = null
    if (props.collapsable === true) {
      collapsed = props.collapsed === undefined ? false : props.collapsed
    }

    this.state = {
      collapsed
    }

    this.onIconClick = this.onIconClick.bind(this)
    this.getIcon = this.getIcon.bind(this)
  }

  getIcon() {
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
    if (this.props.type === WidgetType.TOGGLE) {
      return 'toggle on'
    }
    if (this.props.type === WidgetType.CHART) {
      return 'chart line'
    }
    if (this.props.type === WidgetType.LABEL) {
      return 'pencil alternate'
    }
    if (this.props.type === WidgetType.CSS) {
      return 'code'
    }
    if (this.props.type === WidgetType.JAVASCRIPT) {
      return 'code'
    }
  }

  onIconClick() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    let className = ''
    if (this.props.selected && this.props.id && this.props.selected === this.props.id) {
      className = 'selected'
    }

    return <li className={className} onClick={this.props.onClick} data-id={this.props.id}>
      { this.state.collapsed === true &&
        <Icon size='small' name="plus square outline" onClick={this.onIconClick}/>
      }
      { this.state.collapsed === false &&
        <Icon size='small' name="minus square outline" onClick={this.onIconClick}/>
      }
      <Icon name={this.getIcon()}/>
      {this.props.name}

      { this.state.collapsed === false &&
        <ul>{this.props.children}</ul>
      }
    </li>
  }
}

export default TreeNode
