export const handleChangeID = (component, {detail}, type) => {
  /*
   * Trait sets this automatically somewhere down the lifecycle, but we need the
   * value before that happens. This should be safe.
   */
  component.attr.id = detail.new
  component.render()
}
