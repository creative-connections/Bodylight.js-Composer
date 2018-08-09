import { ANIMATE_ID } from '../types'

import configureStore from '@src/configureStore'

export default (editor) => {
  editor.TraitManager.addType(ANIMATE_ID, {
    getInputEl: function () {
      if (!this.inputEl) {
        let select = document.createElement('select')

        // create empty option as default
        let option = document.createElement('option')
        select.add(option)

        const currentValue = this.getModelValue()
        const {store} = configureStore()

        // fill every animate id from redux
        Object.keys(store.getState().animates).forEach(animate => {
          let option = document.createElement('option')
          option.value = animate
          option.text = animate
          if (animate === currentValue) {
            option.selected = true
          }
          select.add(option)
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
