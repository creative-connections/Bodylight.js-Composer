import { TOGGLE_ID } from '../types'
import { getToggles } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/id'

export default editor => {
  editor.TraitManager.addType(TOGGLE_ID, {
    getInputEl: function () {
      return getInputEl(this, getToggles)
    },

    onValueChange (model, value, opts = {}) {
      return onValueChange(this, model, value, opts)
    }
  })
}
