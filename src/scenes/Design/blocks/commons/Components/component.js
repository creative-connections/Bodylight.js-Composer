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

    this.destroy = this.destroy.bind(this)
    this.listenTo(this.model, 'component:destroy', this.destroy)
  }
}
