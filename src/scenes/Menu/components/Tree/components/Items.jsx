import React, { Component } from 'react'
import TreeNode from './TreeNode'

class Items extends Component {
  renderItem (item) {
    return (
      <TreeNode
        key={item.id}
        id={item.id}
        name={item.name}
        type={item.type}
        onClick={this.props.onClick}
        selected={this.props.selected}
      />
    )
  }

  renderItems () {
    const items = []
    Object.entries(this.props.items).forEach(([key, item]) => {
      if (this.props.filter === null || item.name.search(this.props.filter) !== -1) {
        items.push(this.renderItem(item))
      }
    })
    return items
  }

  render () {
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
