export const handleChangeID = (component, {detail}, type) => {
  /*
   * Trait sets this automatically somewhere down the lifecycle, but we need the
   * value before that happens. This should be safe.
   */
  component.attr.id = detail.new
  component.render()
}

export function init (editor) {
  if (!this.inited) {
    this.inited = true
    // activeOnRender: 1 in block options triggers active on block drop
    this.handleOnDrop = this.handleOnDrop.bind(this)
    this.listenTo(this.model, 'active', this.handleOnDrop)

    // register cascading removals
    this.handleComponentRemove = this.handleComponentRemove.bind(this)
    editor.on('component:remove', this.handleComponentRemove)
    this.editor = editor
  }
}

export function handleComponentRemove (model) {
  let found = false
  const crawl = (parent) => {
    if (parent === this.model) {
      found = true
      return
    }

    let components = parent.get('components')
    // end reached
    if (components === undefined) {
      return
    }

    // DFS crawl for multiple children
    for (const child of components.models) {
      if (found) {
        break
      }
      crawl(child)
    }
  }

  crawl(model)

  if (found) {
    this.remove()
    this.editor.off('component:remove', this.handleComponentRemove)
  }
}
