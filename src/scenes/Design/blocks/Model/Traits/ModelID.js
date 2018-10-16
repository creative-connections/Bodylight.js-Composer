import { MODEL_ID } from '../types'
import { getModels } from '@reducers'
import { getInputEl, onValueChange } from '../../commons/Traits/id'

export default editor => {
  editor.TraitManager.addType(MODEL_ID, {
    getInputEl: function () {
      return getInputEl(this, getModels)
    },

    onValueChange (model, value, opts = {}) {
      return onValueChange(this, model, value, opts)
    }
  })
}
