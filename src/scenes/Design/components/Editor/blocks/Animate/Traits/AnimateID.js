import { ANIMATE_ID } from '../types'

import configureStore from '@src/configureStore'
import { getAnimates } from '@reducers'

export default (editor) => {
  editor.TraitManager.addType(ANIMATE_ID, {
    getInputEl: function () {
      if (!this.inputEl) {
        let select = document.createElement('select')

        // create empty option as default
        let option = document.createElement('option')
        select.add(option)

        const currentValue = this.getModelValue()
        const animates = getAnimates(configureStore().store.getState())

        // fill every animate id from redux
        Object.entries(animates).forEach(([name, animate]) => {
          const option = document.createElement('option')

          option.value = name
          option.text = name
          if (name === currentValue) {
            option.selected = true
          }

          // don't show already placed animates in the list, unless it's us
          if (animate.placed === undefined || name === currentValue) {
            select.add(option)
          }
        })

        this.inputEl = select
      }
      return this.inputEl
    },

    /* Here we are overriding a private method in order to invoke changeName()
       on our target element. So we can redraw the canvas, if necessary */
    onValueChange (model, value, opts = {}) {
      const mod = this.model
      if (opts.fromTarget) {
        this.setInputValue(mod.get('value'))
      } else {
        const value = this.getValueForTarget()
        mod.setTargetValue(value, opts)
      }

      const event = new Event('changeName')
      this.target.view.$el[0].dispatchEvent(event)
    }
  })
}
