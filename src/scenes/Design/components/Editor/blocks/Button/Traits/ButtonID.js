import { BUTTON_ID } from '../types'
import { getButtons } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/id'

export default editor => {
  editor.TraitManager.addType(BUTTON_ID, {
    getInputEl: function () {
      return getInputEl(this, getButtons)
    },

    onValueChange (model, value, opts = {}) {
      return onValueChange(this, model, value, opts)
    }
  })
}
