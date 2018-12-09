import configureStore from '@src/configureStore'
import generateID from '@helpers/generateID'
import { selectWidget } from '@actions'

export const handleChangeID = (component, { detail }, type) => {
  /*
   * Trait sets this automatically somewhere down the lifecycle, but we need the
   * value before that happens. This should be safe.
   */
  component.attr.id = detail.new
  component.render()
}

export function init(editor) {
  if (!this.inited) {
    this.inited = true
    this.editor = editor
    // activeOnRender: 1 in block options triggers active on block drop
    this.handleOnDrop = this.handleOnDrop.bind(this)
    this.listenTo(this.model, 'active', this.handleOnDrop)

    this.destroy = this.destroy.bind(this)
    this.listenTo(this.model, 'component:destroy', this.destroy)
  }
}

export function handleOnDrop(configGetWidget, addWidget) {
  const store = configureStore().store
  const id = generateID()

  const unsubscribe = store.subscribe(() => {
    const config = configGetWidget(store.getState(), id)
    // look for WIDGET_ADD to finish adding our id
    if (config) {
      unsubscribe() // don't listen anymore
      this.attr.id = id
      this.editor.store()
    }
  })

  store.dispatch(addWidget(id))
}

export function getWidget(configGetWidget) {
  const id = this.attr.id
  if (typeof id === 'undefined' || id === null || id === '') {
    return null
  }
  return configGetWidget(configureStore().store.getState(), id)
}

export function destroy(removeWidget) {
  if (this.attr.id) {
    configureStore().store.dispatch(removeWidget(this.attr.id))
  }
}

export function handleClick(widget, editor) {
  if (widget != null) {
    configureStore().store.dispatch(selectWidget(widget.id))
    editor.Panels.getButton('views', 'open-connect').set('active', true)
  }
}