import { BUTTON_NAME, BUTTON_PREFIX } from '../types'

import configureStore from '@src/configureStore'
import { getButtons } from '@reducers'

export default editor => {
  editor.TraitManager.addType(BUTTON_NAME, {
    getInputEl: function () {
      if (!this.inputEl) {
        let select = document.createElement('select')

        // create empty option as default
        let option = document.createElement('option')

        select.add(option)
        const currentValue = this.getModelValue()
        const buttons = getButtons(configureStore().store.getState())

        Object.entries(buttons).forEach(([name, button]) => {
          const option = document.createElement('option')
          const prefixedName = this.addPrefix(name)

          option.value = prefixedName
          option.text = name
          if (prefixedName === currentValue) {
            option.selected = true
          }

          // don't show already placed buttons in the list, unless it's us
          if (button.placed === undefined || prefixedName === currentValue) {
            select.add(option)
          }
        })

        this.inputEl = select
      }
      return this.inputEl
    },

    addPrefix (name) {
      return `${BUTTON_PREFIX}${name}`
    },

    /**
     * Strips PREFIX from name.
     */
    stripPrefix (name) {
      return name.substring(BUTTON_PREFIX.length)
    },

    /* Here we are overriding a private method in order to invoke changeName()
       on our target element. So we can redraw the canvas, if necessary */
    onValueChange (model, value, opts = {}) {
      let previous

      if (opts.fromTarget) {
        previous = this.getInputValue()
        this.setInputValue(value)
      } else {
        previous = model.getTargetValue()
        model.setTargetValue(value, opts)
      }

      const event = new CustomEvent('changeName', {
        detail: {
          'previous': this.stripPrefix(previous),
          'new': this.stripPrefix(value)
        }
      })
      this.target.view.$el[0].dispatchEvent(event)
    }
  })
}
