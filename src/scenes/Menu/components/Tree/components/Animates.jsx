import React, { Component } from 'react'
import TreeNode from './TreeNode'
import memoize from 'fast-memoize'
import WidgetType from '@helpers/enum/WidgetType'

class Animates extends Component {
  constructor(props) {
    super(props)

    this.sortAnims = memoize(this.sortAnims)
    this.sortTexts = memoize(this.sortTexts)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.selected == null || nextProps.selected == null) { return true }

    if (this.props.selected !== nextProps.selected) {
      const types = [WidgetType.ANIMATE, WidgetType.ANIMATE_TEXT, WidgetType.ANIMATE_ANIM]
      if (types.includes(this.props.selected.type)) { return true }
      if (types.includes(nextProps.selected.type)) { return true }
    }

    if (this.props.animates !== nextProps.animates) { return true }
    if (this.props.filter !== nextProps.filter) { return true }

    return false // otherwise we don't care
  }

  sortAnims(anims = {}) {
    return Object.values(anims).sort((a, b) => ('' + a.name).localeCompare(b.name))
  }

  sortTexts(texts = {}) {
    return Object.values(texts).sort((a, b) => ('' + a.name).localeCompare(b.name))
  }

  renderAnims(anims) {
    const out = []
    anims.forEach(anim => {
      if (this.props.filter === null || anim.name.search(this.props.filter) !== -1) {
        out.push(<TreeNode
          key={anim.id}
          id={anim.id}
          name={anim.name}
          type={anim.type}
          onClick={this.props.onClick}
          selected={this.props.selected && this.props.selected.id}
        />)
      }
    })
    return out
  }

  renderTexts(texts) {
    const out = []
    texts.forEach(text => {
      if (this.props.filter === null || text.name.search(this.props.filter) !== -1) {
        out.push(<TreeNode
          key={text.id}
          id={text.id}
          name={text.name}
          type={text.type}
          onClick={this.props.onClick}
          selected={this.props.selected && this.props.selected.id}
        />)
      }
    })
    return out
  }

  renderItems(anims, texts) {
    const out = []
    out.push(this.renderAnims(this.sortAnims(anims)))
    out.push(this.renderTexts(this.sortTexts(texts)))
    return out
  }

  renderAnimate(animate) {
    return (
      <TreeNode
        key={animate.id}
        id={animate.id}
        name={animate.name}
        type={animate.type}
        onClick={this.props.onClick}
        selected={this.props.selected && this.props.selected.id}
        collapsable={true} >
        {this.renderItems(animate.anims, animate.texts)}
      </TreeNode>
    )
  }

  renderAnimates(animates) {
    const out = []
    Object.entries(animates).forEach(([, animate]) => {
      out.push(this.renderAnimate(animate))
    })
    return out
  }

  render() {
    if (Object.keys(this.props.animates).length === 0) {
      return null
    }
    return <ul className='menu-tree-animates'>
      <TreeNode name='Animate' collapsable={true}>
        {this.renderAnimates(this.props.animates)}
      </TreeNode>
    </ul>
  }
}

export default Animates