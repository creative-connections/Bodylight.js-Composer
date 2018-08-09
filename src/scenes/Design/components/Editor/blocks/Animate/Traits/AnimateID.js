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
    }
  })
}
