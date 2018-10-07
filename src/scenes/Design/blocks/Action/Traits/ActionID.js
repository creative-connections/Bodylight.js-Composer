import { ACTION_ID } from '../types'
import { getActions } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/id'

export default editor => {
  editor.TraitManager.addType(ACTION_ID, {
    getInputEl: function () {
      return getInputEl(this, getActions)
    },

    onValueChange (action, value, opts = {}) {
      return onValueChange(this, action, value, opts)
    }
  })
}
