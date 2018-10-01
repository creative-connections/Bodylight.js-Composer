import configureStore from '@src/configureStore'

export const getInputEl = (trait, getComponents, filter = true) => {
  if (!trait.inputEl) {
    let select = document.createElement('select')

    // create empty option as default
    let option = document.createElement('option')

    select.add(option)
    const currentValue = trait.getModelValue()
    const components = getComponents(configureStore().store.getState())
    console.log(components)

    Object.entries(components).forEach(([id, component]) => {
      const option = document.createElement('option')

      option.value = id
      option.text = component.name

      if (id === currentValue) {
        option.selected = true
      }
      select.add(option)
    })
    trait.inputEl = select
  }
  return trait.inputEl
}

/* Here we are overriding a private method in order to invoke changeName()
       on our target element. So we can redraw the canvas, if necessary */
export const onValueChange = (trait, model, value, opts = {}) => {
  let previous

  if (opts.fromTarget) {
    previous = trait.getInputValue()
    trait.setInputValue(value)
  } else {
    previous = model.getTargetValue()
    model.setTargetValue(value, opts)
  }

  const event = new CustomEvent('changeID', {
    detail: {
      'previous': previous,
      'new': value
    }
  })

  trait.target.view.$el[0].dispatchEvent(event)
}
