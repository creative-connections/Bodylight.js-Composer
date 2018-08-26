import { ANIMATE_ID } from '../types'
import { getAnimates } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/id'

export default editor => {
  editor.TraitManager.addType(ANIMATE_ID, {
    getInputEl: function () {
      return getInputEl(this, getAnimates)
    },
    onValueChange (model, value, opts = {}) {
      return onValueChange(this, model, value, opts)
    }
  })
}
