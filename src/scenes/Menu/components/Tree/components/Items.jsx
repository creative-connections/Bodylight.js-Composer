import React, { Component } from 'react'
import TreeNode from './TreeNode'

class Items extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.selected == null || nextProps.selected == null) { return true }

    if (this.props.selected !== nextProps.selected) {
      // re-render if the current selected type is ours
      if (this.props.selected.type === this.props.type) { return true }
      // re-render if the next selected type is ours
      if (nextProps.selected.type === this.props.type) { return true }
    }

    if (this.props.items !== nextProps.items) { return true }
    if (this.props.filter !== nextProps.filter) { return true }

    return false // otherwise we don't care
  }

  renderItem(item) {
    return (
      <TreeNode
        key={item.id}
        id={item.id}
        name={item.name}
        type={item.type}
        onClick={this.props.onClick}
        selected={this.props.selected && this.props.selected.id}
      />
    )
  }

  renderItems() {
    const items = []
    Object.entries(this.props.items).forEach(([, item]) => {
      if (this.props.filter == null || item.name.search(this.props.filter) !== -1) {
        items.push(this.renderItem(item))
      }
    })
    return items
  }

  render() {
    if (Object.keys(this.props.items).length === 0) {
      return null
    }
    return <ul className='menu-tree-items'>
      <TreeNode name={this.props.name} collapsable={true} collapsed={this.props.collapsed}>
        {this.renderItems()}
      </TreeNode>
    </ul>
  }
}

export default Items