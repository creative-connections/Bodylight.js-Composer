import configureStore from '@src/configureStore'

export const handleChangeName = (component, {detail}, place, remove) => {
  /**
   * Callback on the event 'changeName'. Button provider has changed, we
   * need to redraw it in the editor.
   */
  const name = component.el.getAttribute('name')

  // update redux state that we have changed our endpoint
  const {store} = configureStore()
  store.dispatch(remove(detail.previous))
  store.dispatch(place(detail.new))

  /*
   * Trait sets this automatically somewhere down the lifecycle, but we need the
   * value before that happens. This should be safe.
   */
  component.attr.name = name
  component.render()
}
