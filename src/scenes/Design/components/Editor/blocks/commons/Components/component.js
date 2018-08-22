import configureStore from '@src/configureStore'

export const handleChangeID = (component, {detail}, place, remove) => {
  // update redux state that we have changed our endpoint
  const {store} = configureStore()
  store.dispatch(remove(detail.previous))
  store.dispatch(place(detail.new))

  /*
   * Trait sets this automatically somewhere down the lifecycle, but we need the
   * value before that happens. This should be safe.
   */
  component.attr.id = detail.new
  component.render()
}
