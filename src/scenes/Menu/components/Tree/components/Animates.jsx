import React, { Component } from 'react'
import TreeNode from './TreeNode'

class Animates extends Component {
  renderItems (anims, texts) {
    const out = []
    Object.entries(anims).forEach(([key, anim]) => {
      if (this.props.filter === null || anim.name.search(this.props.filter) !== -1) {
        out.push(<TreeNode
          key={anim.id}
          id={anim.id}
          name={anim.name}
          type={anim.type}
          placed={anim.placed}
          onClick={this.props.onClick}
          selected={this.props.selected}
        />)
      }
    })
    Object.entries(texts).forEach(([key, text]) => {
      if (this.props.filter === null || text.name.search(this.props.filter) !== -1) {
        out.push(<TreeNode
          key={text.id}
          id={text.id}
          name={text.name}
          type={text.type}
          placed={text.placed}
          onClick={this.props.onClick}
          selected={this.props.selected}
        />)
      }
    })
    return out
  }

  renderAnimate (animate) {
    return (
      <TreeNode
        key={animate.id}
        id={animate.id}
        name={animate.name}
        type={animate.type}
        onClick={this.props.onClick}
        selected={this.props.selected}
        collapsable={true} >
        {this.renderItems(animate.anims, animate.texts)}
      </TreeNode>
    )
  }

  renderAnimates () {
    const animates = []
    Object.entries(this.props.animates).forEach(([key, animate]) => {
      animates.push(this.renderAnimate(animate))
    })
    return animates
  }

  render () {
    if (Object.keys(this.props.animates).length === 0) {
      return null
    }
    return <ul className='menu-tree-animates'>
      <TreeNode name='Animate' collapsable={true}>
        {this.renderAnimates()}
      </TreeNode>
    </ul>
  }
}

export default Animates
