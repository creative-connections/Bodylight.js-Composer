import React, { Component, Fragment } from 'react'
import { Icon } from 'semantic-ui-react'

class TreeNode extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false
    }

    this.onIconClick = this.onIconClick.bind(this)
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
        {this.props.name}
      </Fragment>
    }

    return <Fragment>
      <Icon size='small' name="minus square outline" onClick={this.onIconClick}/>
      {this.props.name}
      <ul>{this.props.children}</ul>
    </Fragment>
  }

  render () {
    let className = ''
    if (this.props.selected !== undefined &&
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
        {this.props.name}
      </li>
    )
  }
}

export default TreeNode
