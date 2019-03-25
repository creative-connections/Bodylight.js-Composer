import React, { Component, Fragment } from 'react'

class Collapsable extends Component {
  constructor (props) {
    super(props)

    const collapsed = this.props.collapsed
    this.state = {
      collapsed
    }
    this.toggle = this.toggle.bind(this)
  }

  renderChildren () {
    return this.props.children
  }

  toggle () {
    this.setState({collapsed: !this.state.collapsed})
  }

  render () {
    return <Fragment>
      <div className={`collapsable ${this.props.className}`} onClick={this.toggle}>
        <i className={`fa fa-caret-${this.state.collapsed ? 'right' : 'down'}`} />
        {this.props.title}
      </div>
      {!this.state.collapsed && this.renderChildren()}
    </Fragment>
  }
}

export default Collapsable
