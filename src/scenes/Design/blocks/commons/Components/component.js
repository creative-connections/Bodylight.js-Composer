import configureStore from '@src/configureStore'
import { editorWidgetPlace, editorWidgetRemove } from '@actions'

export const handleChangeID = (component, {detail}, type) => {
  // update redux state that we have changed our endpoint
  const {store} = configureStore()

  if (detail.previous) { // truthy check
    store.dispatch(editorWidgetRemove(detail.previous, type))
  }
  if (detail.new) {
    store.dispatch(editorWidgetPlace(detail.new, type))
  }

  /*
   * Trait sets this automatically somewhere down the lifecycle, but we need the
   * value before that happens. This should be safe.
   */
  component.attr.id = detail.new
  component.render()
}
