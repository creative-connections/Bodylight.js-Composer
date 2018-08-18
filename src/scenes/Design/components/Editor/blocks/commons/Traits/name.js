import configureStore from '@src/configureStore'

export const getInputEl = (trait, addPrefix, getComponents) => {
  if (!trait.inputEl) {
    let select = document.createElement('select')

    // create empty option as default
    let option = document.createElement('option')

    select.add(option)
    const currentValue = trait.getModelValue()
    const components = getComponents(configureStore().store.getState())

    Object.entries(components).forEach(([name, component]) => {
      const option = document.createElement('option')
      const prefixedName = addPrefix(name)

      option.value = prefixedName
      option.text = name
      if (prefixedName === currentValue) {
        option.selected = true
      }
      // don't show already placed components in the list, unless it's us
      if (component.placed === undefined || prefixedName === currentValue) {
        select.add(option)
      }
    })
    trait.inputEl = select
  }
  return trait.inputEl
}

/* Here we are overriding a private method in order to invoke changeName()
       on our target element. So we can redraw the canvas, if necessary */
export const onValueChange = (trait, stripPrefix, model, value, opts = {}) => {
  let previous

  if (opts.fromTarget) {
    previous = trait.getInputValue()
    trait.setInputValue(value)
  } else {
    previous = model.getTargetValue()
    model.setTargetValue(value, opts)
  }

  const event = new CustomEvent('changeName', {
    detail: {
      'previous': stripPrefix(previous),
      'new': stripPrefix(value)
    }
  })

  trait.target.view.$el[0].dispatchEvent(event)
}
