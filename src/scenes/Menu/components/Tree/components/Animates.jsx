import React, { Component } from 'react'
import TreeNode from './TreeNode'
import memoize from 'memoize-one'

class Animates extends Component {
  constructor (props) {
    super(props)

    this.sortAnims = memoize(this.sortAnims)
    this.sortTexts = memoize(this.sortTexts)
  }

  // TODO: check if properly memoized
  sortAnims (anims) {
    return Object.values(anims).sort((a, b) => ('' + a.name).localeCompare(b.name))
  }

  // TODO: check if properly memoized
  sortTexts (texts) {
    return Object.values(texts).sort((a, b) => ('' + a.name).localeCompare(b.name))
  }

  renderItems (anims, texts) {
    const out = []

    anims.forEach(anim => {
      if (this.props.filter === null || anim.name.search(this.props.filter) !== -1) {
        out.push(<TreeNode
          key={anim.id}
          id={anim.id}
          name={anim.name}
          type={anim.type}
          onClick={this.props.onClick}
          selected={this.props.selected}
        />)
      }
    })

    texts.forEach(text => {
      if (this.props.filter === null || text.name.search(this.props.filter) !== -1) {
        out.push(<TreeNode
          key={text.id}
          id={text.id}
          name={text.name}
          type={text.type}
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
        {this.renderItems(this.sortAnims(animate.anims), this.sortTexts(animate.texts))}
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
