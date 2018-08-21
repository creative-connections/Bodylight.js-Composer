import React, { Component, Fragment } from 'react'
import TreeNode from './TreeNode'

class Items extends Component {
  renderItem (item) {
    return (
      <TreeNode
        key={item.id}
        id={item.id}
        name={item.name}
        onClick={this.props.onClick}
        selected={this.props.selected}
      />
    )
  }

  renderItems () {
    const items = []
    Object.entries(this.props.items).forEach(([key, item]) => {
      items.push(this.renderItem(item))
    })
    return items
  }

  render () {
    return <ul className='menu-tree-items'>
      <TreeNode name={this.props.name} collapsable={true}>
        {this.renderItems()}
      </TreeNode>
    </ul>
  }
}

export default Items
